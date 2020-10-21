import React from 'react';
import {  View, StyleSheet, Button} from 'react-native';
import { Input, CheckBox} from 'react-native-elements';
import * as SecureStore from 'expo-secure-store';

class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            remember: false
        }
    }
    componentDidMount(){
        SecureStore.getItemAsync('userinfo')
            .then((userdata)=>{
                let userinfo = JSON.parse(userdata)
                if (userinfo){
                    this.setState({username: userinfo.username})
                    this.setState({password: userinfo.password})
                    this.setState({remember: true})
                }
            })
    }
    static navigationOptions = {
        title: 'Login'
    }

    handleLogin(){
        console.log(JSON.stringify(this.state));
        if (this.state.remember){
            SecureStore.setItemAsync('userinfo',
                                     JSON.stringify({username: this.state.username, 
                                                     password: this.state.password
                                                    })
                                    )
                        .catch((err)=> console.log('Could not save the user', err))
        }
        else{
            SecureStore.deleteItemAsync('userinfo')
                        .catch((err)=> console.log('Could not delete the user', err))
            this.setState({username: ''})
            this.setState({password: ''})
            this.setState({remember: false})
        }
    }

    render(){
        return(
            <View style={styles.container}>
                <Input placeholder="Username"
                        leftIcon={{type: 'font-awesome', name: 'user-o'}}
                        onChangeText={(username) => this.setState({username})}
                        value={this.state.username}
                        containerStyle={styles.formInput}
                />
                <Input placeholder="Password"
                        leftIcon={{type:'font-awesome', name: 'user-o'}}
                        onChangeText={(password) => this.setState({password})}
                        value={this.state.password}
                        containerStyle={styles.formInput}
                />
                <CheckBox title="Remember Me"
                          center
                          checked={this.state.remember}
                          onPress={() => this.setState({remember: !this.state.remember})}
                          containerStyle={styles.formCheckbox}
                />
                <View style={styles.formButton}>
                    <Button onPress={()=> this.handleLogin()}
                             title = "Login"
                             color = "purple"
                    />
                </View>
            </View>
        );
    } 
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        margin: 20
    },
    formInput: {
        margin: 40
    },
    formCheckbox: {
        margin: 40,
        backgroundColor: null
    },
    formButton:{
        margin: 60
    }
})

export default Login