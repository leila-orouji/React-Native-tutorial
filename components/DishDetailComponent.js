import React from 'react';
import{Text, View, ScrollView, FlatList} from 'react-native';
import { Card, Icon} from 'react-native-elements';
import {DISHES} from './../shared/dishes';
import {COMMENTS} from '../shared/comments';
import{baseUrl} from '../shared/baseUrl';
import{connect} from 'react-redux';
import {postFavorite} from '../redux/actionCreator';

function RenderDish(props){
    const dish = props.dish;

    if (dish != null ){
        return(
            <Card featuredTitle={dish.name}
                  image={{uri: baseUrl+dish.image}}>
                <Text style={{margin:10}}>
                    {dish.description}
                    {dish.price}
                </Text>
                <Icon raised reverse name={props.favorite ? 'heart' : 'heart-o'} type='font-awesome' color='#f50' 
                      onPress={() => props.favorite ? console.log('Already favorite') : props.onPress()} />
            </Card>
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