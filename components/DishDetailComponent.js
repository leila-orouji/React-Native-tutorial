import React from 'react';
import{Text, View, ScrollView, FlatList, Alert, PanResponder, Share} from 'react-native';
import { Card, Icon} from 'react-native-elements';
import{baseUrl} from '../shared/baseUrl';
import{connect} from 'react-redux';
import {postFavorite} from '../redux/actionCreator';

function RenderDish(props){
    const dish = props.dish;
    const shareDish = (title, message, url) =>{
        Share.share({
            title: title,
            message: title+':'+message+ ' '+ url,
            url: url
        },{
            dialogTitle: 'Share' + title
        })
    }
    const recognizeDrag =({moveX, moveY, dx, dy}) =>{
        if (dx< -200)     //move from Rightt to left
            return true;
        else
            return false;
    }

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (event, gestureState) =>{
            return true;
        },
        onPanResponderEnd: (event, gestureState ) =>{
            if (recognizeDrag(gestureState))
                Alert.alert(
                    'Add to Favorite',
                    'Are you sure you wish to add'+ dish.name +'to your favorites?',
                    [
                        { text: 'Ask me later',
                                 onPress: () => console.log('Ask me later pressed')
                        },
                        { text: 'Cancel',
                                onPress: () => console.log('Cancel Pressed'),
                                style: 'cancel'
                        },
                        { text: 'OK', onPress: () => props.favorite ? console.log('Already favorite') : props.onPress() }
                    ],
                    { cancelable: false }
                )
            return true;
        }
    })
    
    if (dish != null ){
        return(
            <View {...panResponder.panHandlers}>
                <Card featuredTitle={dish.name}
                    image={{uri: baseUrl+dish.image}}>
                    <Text style={{margin:10}}>
                        {dish.description}
                        {dish.price}
                    </Text>
                    <Icon raised
                          reverse 
                          name={props.favorite ? 'heart' : 'heart-o'} 
                          type='font-awesome' color='#f50' 
                          onPress={() => props.favorite ? console.log('Already favorite') : props.onPress()} 
                    />
                    <Icon raised 
                          reverse 
                          name={'pencil'} 
                          type='font-awesome' 
                          color='#512DAB' 
                          onPress={() => console.log('Edit the dish')}
                     />
                    <Icon raised
                          reverse 
                          name='share'
                          type='font-awesome'
                          color='#5102AB'
                          onPress={()=> shareDish(dish.name, dish.description, baseUrl+dish.image)}
                    />
                </Card>
            </View>
        );
    } 
    else{
        return( <View></View>)
    }
}

function RenderComments(props){

    const comments = props.comments;
   
    const renderCommentItems = ({item, index}) =>{
        return(
            <View key={index} style={{margin: 10}}>
                <Text style= {{fontSize: 14}}>
                    {item.comment}
                </Text>
                <Text style={{fontSize: 12}} >
                    {item.rating}Stars
                </Text>
                <Text style={{fontSize: 12}}>
                    {'-- '+ item.auther+', '+ item.date}
                </Text>
            </View>
        )
    }
    return(
        <Card title="Comments">
            <FlatList data={comments} renderItem={renderCommentItems} keyExtractor={item => item.id.toString()} />
        </Card>
    )  
}

class DishDetail extends React.Component{

    markedFavorite(dishId){
        // this.setState({ favorites: this.state.favorites.concat(dishId)})
        this.props.postFavorite(dishId)
    }
    static navigationOptions = {
        title: 'Dish Details'
    }

    render(){
        const {dishId} =this.props.route.params;
     // [+dishId ] => turn the string to number
        return(
            <ScrollView>
                <RenderDish dish={this.props.dishes.dishes.filter( dish => dish.id === dishId)[0]} 
                            favorite={this.props.favorites.some(el => el===dishId)}
                            onPress={() => this.markedFavorite(dishId)} />
                <RenderComments comments={this.props.comments.comments.filter( comment => comment.dishId === dishId)} />    
            </ScrollView>   
        )
    }
}
const mapStateToProps = state=>{
    return {
        dishes: state.dishes,
        comments: state.comments,
        favorites: state.favorites
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        postFavorite: (dishId) => dispatch(postFavorite(dishId))
    }
}
export default connect (mapStateToProps, mapDispatchToProps)(DishDetail);