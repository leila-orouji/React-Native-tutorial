import React from 'react';
import { FlatList, Alert } from 'react-native';
import { Avatar, ListItem, Card } from 'react-native-elements';
import { connect } from 'react-redux';
import { Loading } from './LoadingComponent';
import Swipeout from 'rc-swipeout';
import { deleteFavorite } from '../redux/actionCreator';

class Favorites extends React.Component {

    static navigationOptions = {
        title: 'Favorites'
    }

    keyExtractors = (item, index) => index.toString()

    render() {

        const { navigate } = this.props.navigation;

        const renderMenuItem = ({ item, index }) => {
            return (
                <Swipeout left={[{
                            text: 'reply',
                            onPress: () => console.log('reply'),
                            style: { backgroundColor: 'orange', color: 'white' },
                            className: 'custom-class-1'}
                            ]}
                          right={[{
                            text: 'delete',
                            onPress: () =>{
                                Alert.alert('Delete',
                                    'Are you sure to delete the favorite dish?',
                                    [
                                      { text: 'Ask me later',
                                        onPress: () => console.log('Ask me later pressed')
                                      },
                                      { text: 'Cancel',
                                        onPress: () => console.log('Cancel Pressed'),
                                        style: 'cancel'
                                      },
                                      { text: 'OK', onPress: () => this.props.deleteFavorite(item.id) }
                                    ],
                                    { cancelable: false }
                                  )
                            },
                            style: { backgroundColor: 'red', color: 'white' },
                            className: 'custom-class-2' }
                             ]}
                            autoClose={true}
                >
                            <ListItem key={index}
                                bottomDivider
                                onPress={() => this.props.navigation.navigate('DishDetail', { dishId: item.id })}
                            >
                                <Avatar source={{ uri: item.image }} />
                                <ListItem.Content>
                                    <ListItem.Title>{item.name}</ListItem.Title>
                                    <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
                                </ListItem.Content>
                                <ListItem.Chevron />
                            </ListItem>
                </Swipeout>
            )

        }

        if (this.props.dishes.isLoading) {
            return (
                <>
                    <Card title='Favorites Dishes'>
                        <Loading />
                    </Card>
                </>
            );
        }
        else if (this.props.dishes.errMess) {
            return (
                <>
                    <Card title='Favorites dishes'>
                        <Text>{this.props.dishes.errMess}</Text>
                    </Card>
                </>
            )
        }
        else {
            return (
                <FlatList data={this.props.dishes.dishes.filter((dish) => this.props.favorites.some(el => el === dish.id))}
                    keyExtractor={this.keyExtractors}
                    renderItem={renderMenuItem} />
            )
        }
    }
}
const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        favorites: state.favorites
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteFavorite: (dishId) => dispatch(deleteFavorite(dishId))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Favorites);