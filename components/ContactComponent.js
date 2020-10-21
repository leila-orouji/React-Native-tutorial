import React from 'react';
import{ View, Text} from 'react-native';
import { LEADERS } from '../shared/leaders';
import { Card, Button, Icon} from 'react-native-elements';
import * as MailComposer from 'expo-mail-composer';

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

    sendMail(){
        MailComposer.composeAsync({
            recipients: ['leila.orooji@gmail.com'],
            subject: 'Enquiry',
            body: 'To whome it may concern'
        })
    }
    
    render(){
        return(
            <>
            <View>
                <Card title='Contact Information'>
                    <Text style={{margin: 10}}>121, Clear street</Text>
                    <Text style={{margin: 10}}>Country: ... </Text>
                    <Text style={{margin: 10}}>Tell: ...</Text>
                    <Text style={{margin: 10}}>Fax: ...</Text>
                    <Text style={{margin: 10}}>Email: ...</Text>
                    <Button title='Send Email' 
                            buttonStyle={{backgroundColor:'#512DBA'}}
                            icon = {<Icon name='envolp-0' type='font-awesome'color='white'/>}
                            onPress={this.sendMail}
                    />
                </Card>
            </View>
          </>
        )
     
    }

}

export default Contact;