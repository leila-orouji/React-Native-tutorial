import React from 'react';
import{view, FlatList} from 'react-native';
import { ListItem} from 'react-native-elements';

function Menu (props){

    const renderMenuItem = ({item, index})=> {
        return(
            <ListItem key={index}
                      title = {item.name}
                      subtitle={item.description}
                      hideChevron={true}
                      leftAvatar={{rounded: true, size:'medium', source: require('./images/fruits.png')}} 
                    />
        )
    }
    return(
        <FlatList data={props.dishes}
                  renderItem={renderMenuItem}
                  keyExtractor={item => item.id.toString()} />
    )
}

export default Menu;