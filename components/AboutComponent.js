import React from 'react';
import{ FlatList, Text} from 'react-native';
import { ListItem, Card} from 'react-native-elements';
import { LEADERS } from '../shared/leaders';
import {connect} from 'react-redux';
import {baseUrl} from '../shared/baseUrl';

function History(){
    return(
        <Card title='Our History'>
            <Text style={{margin: 10}}>
                Started in 2 months ago ...
            </Text>
            <Text style={{margin: 10}}>
                This course is about learning full stack with react/ the current course is about react native.
            </Text>
        </Card>
    )
}
class About extends React.Component{


    static navigationOptions = {
        title: 'About'
    }

    
    render(){
       
       const { params} = this.props.route;
       const renderleaderItem = ({item, index})=> {
            return(
                <ListItem roundAvatar
                          key={index}
                          title = {item.name}
                          subtitle={item.description}
                          subtitleNumberOfLines={15}
                          hideChevron={true} 
                          leftAvatar={{source: {uri: baseUrl+item.image}}}
                        />
            )
        }  
        const {navigate } = this.props.navigation;
        return(
            <>
            <History/>
            <Card title='Corporate leadership'>
                <FlatList data={this.props.leaders.leaders}
                        renderItem={renderleaderItem}
                        keyExtractor={item => item.id.toString()} />
            </Card>
            </>
        )
    }
}
const mapStatesToProps = state => {
    return{
        leaders: state.leaders
    }
}

export default connect (mapStatesToProps)(About);