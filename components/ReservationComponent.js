import React from 'react';
import { Text, View, StyleSheet, Picker, Switch, Button, Modal, Alert} from 'react-native';
import {Card} from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import * as Permissions from 'expo-permissions';
import * as Notifications from 'expo-notifications';

class Reservation extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            guests: 1,
            smoking: false,
            date: '',
            showModal: false
        }
    }

    static navigationOptions = {
        title: 'Reserve Table'
    }

    toggleModal(){
        this.setState({
            showModal: !this.state.showModal
        })
        console.log(this.state)
    }
    handleReservation(){
        console.log(JSON.stringify(this.state));
        let message = 'Number of guests: '+ this.state.guests +
                      '\nSmoking? '+ `${this.state.smoking ? 'Yes' : 'NO'}` +
                      '\nDate and Time: '+this.state.date
        
        Alert.alert('Your reservation OK?',
                     message,
                     [
                         {text: 'Cancel', onPress: ()=>{
                                            console.log('Reservation canceled.');
                                            this.reseatForm();
                                            }, style: 'cancel'
                         },
                         {text: 'OK', onPress: ()=>{
                                        this.presentLocalNotification(this.state.date)
                                        this.reseatForm();
                                         }
                        }
                     ]
        )
        // this.toggleModal();
    }

    reseatForm(){
        this.setState({
            guests: 1,
            smoking: false,
            date: ''
        })
    }

    async obtainNotificationPermission(){
        let permission = await Permissions.getAsync(Permissions.USER_FACING_NOTIFICATIONS);
        if (permission.status !== 'granted') {
            permission = await Permissions.askAsync(Permissions.USER_FACING_NOTIFICATIONS);
            if (permission.status !== 'granted'){
                Alert.alert('Permission not granted to show notification')
            }
        }
        return permission;
    }

    async presentLocalNotification(date){
        await this.obtainNotificationPermission();
        Notifications.presentNotificationAsync({
            title: 'Your reservation',
            body: 'Reservation for'+ date + 'requested',
            ios: {
                sound: true
            },
            android: {
                sound: true,
                vibrate: true,
                color: '#512DAB'
            }
        });
    }

    render(){
        return(
            <>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>
                        Number Of Guests
                    </Text>
                    <Picker style={styles.formItem} 
                            selectedValue={this.state.guests}
                            onValueChange={(itemValue, itemIndex) => this.setState({
                                guests : itemValue
                            })}
                            >
                                <Picker.Item  value='1' label='1' />
                                <Picker.Item  value='2' label='2' />
                                <Picker.Item value='3' label='3'  />
                                <Picker.Item  value='4' label='4' />
                                <Picker.Item value='5' label='5'  />
                                <Picker.Item  value='6' label='6' />
                    </Picker>
                </View>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>
                        Smoking/ Non-Smoking
                    </Text>
                    <Switch style={styles.formItem} value={this.state.smoking} onTintColor='#512DAB'
                            onValueChange={(value)=> this.setState({smoking: value})}>
                    </Switch>
                </View>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>
                        Date and Time
                    </Text>
                    <DatePicker style={{flex:2, marginRight: 20}} date={this.state.date} format='YYYY-MM-DD' 
                                mode='date' placeholder='select date and time' minimumDate='2020-01-01'
                                confirmBtnText='Confirm' cancelBtnText='Cancel' customStyles={{
                                dateIcon: { position: 'absolute',
                                            left: 0,
                                            top: 4,
                                            marginLeft: 0},
                                dateInput:{ marginLeft: 36}}} onDateChange={(date) => {this.setState({date: date})}} />
                </View>
                <View style={styles.formRow}>
                        <Button title='Reserve' color='#512DAB' onPress={()=>this.handleReservation()} 
                                accessibilityLabel='Learn More about this purple button' />
                </View>
                <Modal animationType={'slide'} transparent={false} visible={this.state.showModal}
                       onDismiss={()=> {this.toggleModal(); this.reseatForm()}} 
                       onRequestClose={()=> {this.toggleModal(); this.reseatForm()}}>
                           <View style={styles.modal}>
                               <Text style={styles.modalTitle}>Your Reservation</Text>
                               <Text style={styles.modalText}>Number of Guests: {this.state.guests}</Text>
                               <Text style={styles.modalText}>Smoking: {`${this.state.smoking ? 'Yes' : 'NO'}`}</Text>
                               <Text style={styles.modalText}>Date and Time: {this.state.date}</Text>
                               <Button onPress={()=>{this.toggleModal(); this.reseatForm()}}
                                        color='#512DAB' title='Close'/>
                           </View>
                </Modal>
            </>
        )
    }
}

const styles = StyleSheet.create({
    formRow:{
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    formLabel:{
        fontSize: 18,
        flex: 2
    },
    formItem:{
        flex: 1
    },
    modal:{
        justifyContent: 'center',
        margin: 20
    },
    modalTitle:{
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: '#512DAB',
        textAlign: 'center',
        color: 'white',
        marginBottom: 20
    },
    modalText:{
        fontSize: 18,
        margin: 10
    }
})
export default Reservation;