import React from 'react';
import{ FlatList} from 'react-native';
import { ListItem} from 'react-native-elements';
import { LEADERS } from '../shared/leaders';

class Contact extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            leaders: LEADERS
        }
    }

    static navigationOptions = {
        title: 'Contact'
    }

    
    render(){
       const renderleaderItem = ({item, index})=> {
            return(
                <ListItem key={index}
                          title = {item.name}
                          subtitle={item.description}
                          hideChevron={true} 
                        //   onPress={() => this.props.navigation.navigate('DishDetail', {dishId: item.id})}
                        //   leftAvatar={{rounded: true, size:'medium', source: require('./images/fruits.png')}} 
                        />
            )
        }
        const {navigate } = this.props.navigation;
        return(
            <FlatList data={this.state.leaders}
                      renderItem={renderleaderItem}
                      keyExtractor={item => item.id.toString()} />
        )
    }

}

export default Contact;