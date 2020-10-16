import React from 'react';
import{ FlatList} from 'react-native';
import { Tile} from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import{ Loading }from './LoadingComponent';

class Menu extends React.Component{

    static navigationOptions = {
        title: 'Menu'
    }

    
    render(){
       const renderMenuItem = ({item, index})=> {
            return(
                <Tile key={index}
                          title = {item.name}
                          caption={item.description}
                          featured
                          onPress={() => this.props.navigation.navigate('DishDetail', {dishId: item.id})}
                          imageSrc={{source: {uri: baseUrl+ item.image}}} 
                        />
            )
       }
            const {navigate } = this.props.navigation;
        if(this.props.dishes.isLoading){
            return (
                <>
                    <History/>
                    <Card title='Menu Dishes'>
                        <Loading/>
                    </Card>
                </>
            );
        }
        else if (this.props.dishes.errMess){
            return(
                <>
                <History/>
                <Card title='Menu dishes'>
                    <Text>{this.props.dishes.errMess}</Text>
                </Card>
            </>
            )
        }
        else{
            return(
                <FlatList data={this.props.dishes.dishes}
                          renderItem={renderMenuItem}
                          keyExtractor={item => item.id.toString()} />
            )
        } 
    }
         
}

const mapStateToProps = state => {
    return{
        dishes: state.dishes,
    }
}

export default connect(mapStateToProps)(Menu);