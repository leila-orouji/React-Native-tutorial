import React from 'react';
import{Text, View} from 'react-native';
import { Card } from 'react-native-elements';
import {DISHES} from './../shared/dishes';

function RenderDish(props){
    const dish = props.dish;

    if (dish != null ){
        return(
            <Card featuredTitle={dish.name}
                  image={require('./images/frymire.png')}>
                <Text style={{margin:10}}>
                    {dish.description}
                    {dish.price}
                </Text>
                
            </Card>
        );
    } 
    else{
        return( <View></View>)
    }
}


class DishDetail extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            dishes: DISHES
        };
    }

    static navigationOptions = {
        title: 'Dish Details'
    }

    render(){
        console.log(this.props.navigation)
        const {dishId} =this.props.route.params;
// [+dishId ] => turn the string to number
        return(
            <RenderDish dish={this.state.dishes.filter( dish => dish.id === dishId)[0]}/>       
        )
    }
}
export default DishDetail;