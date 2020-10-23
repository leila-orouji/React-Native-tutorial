import React from 'react';
import { StyleSheet, Image, View} from 'react-native';
import { Input, CheckBox, Icon, Button} from 'react-native-elements';
import * as SecureStore from 'expo-secure-store';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {baseUrl} from '../shared/baseUrl';
// import { color } from 'react-native-reanimated';
import  * as ImageManipulator from'expo-image-manipulator';
import Asset from 'expo-asset';

class LoginTab extends React.Component{
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
        title: 'Login',
        tabBarIcon: ({tiniColor}) =>{
            <Icon name='sign-in'
                  type='font-awesome'
                  size={24}
                  iconStyle={{color: tiniColor}}
            />
        }
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
                             icon={ <Icon name='sign-in'
                                          type='font-awesome' 
                                          color='white'
                                          size={24}
                                     />
                                  }
                             buttonStyle={{ backgroundColor : "purple"}}
                    />
                </View>
                <View  style={styles.formButton}>
                      <Button onPress={()=> this.props.navigation.navigate("Register")}
                             title = "Register"
                             clear
                             icon={ <Icon name='user-plus'
                                          type='font-awesome' 
                                          color='blue'
                                          size={24}
                                     />
                                  }
                             titleStyle={{ color : "blue"}}
                       />
                </View>
            </View>
        );
    } 
}


class RegisterTAb extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            firstname: '',
            lastname: '',
            email: '',
            remember: false,
            imageUrl: baseUrl+'images/boat.png'
        }
    }

    getImageFromCamera = async() => {
        const cameraPermission = await Permissions.askAsync(Permissions.CAMERA);
        const cameraRollPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);

        if (cameraPermission.status === 'granted' && cameraRollPermission.status ==='granted'){
            let capturedImage = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [4,3]
            });
            if(!capturedImage.cancelled){
                this.processImage(capturedImage.uri);
            }  
        }
                
    }

    processImage = async(imageUri) => {
        let processedImage = await ImageManipulator.manipulateAsync(
            imageUri, 
            [
                { resize: { width: 400}}
            ],
            {format: ImageManipulator.SaveFormat.PNG}
         );
         this.setState({ imageUrl: processedImage.uri })
    }

    static navigationOptions = {
        title: 'Register',
        tabBarIcon: ({tiniColor}) =>{
            <Icon name='user-plus'
                  type='font-awesome'
                  size={24}
                  iconStyle={{color: tiniColor}}
            />
        }
    };

    handleRegister(){
        console.log(JSON.stringify(this.state));
        if (this.state.remember)
            SecureStore.setItemAsync('userinfo',
                                     JSON.stringify({username: this.state.username, 
                                                     password: this.state.password
                                                     })
                                    )
                    .catch((err)=> console.log('Could not save the user', err))
                                     
    }

    render(){
        return(
            <>
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image source={{uri: this.state.imageUrl}}
                            loadingIndicatorSource={require('./images/pool.png')}
                            style={styles.image}
                     />
                     <Button title='Camera'
                             onPress={this.getImageFromCamera} 
                     />
                </View>
                <Input placeholder="Username"
                        leftIcon={{type: 'font-awesome', name: 'user-o'}}
                        onChangeText={(username) => this.setState({username})}
                        value={this.state.username}
                        containerStyle={styles.formInput}
                />
                <Input placeholder="Password"
                        leftIcon={{type: 'font-awesome', name: 'user-o'}}
                        onChangeText={(password) => this.setState({password})}
                        value={this.state.password}
                        containerStyle={styles.formInput}
                />
                <Input placeholder="First Name"
                        leftIcon={{type:'font-awesome', name: 'user-o'}}
                        onChangeText={(firstname) => this.setState({firstname})}
                        value={this.state.firstname}
                        containerStyle={styles.formInput}
                />
                <Input placeholder="Last Name"
                        leftIcon={{type: 'font-awesome', name: 'user-o'}}
                        onChangeText={(lastname) => this.setState({lastname})}
                        value={this.state.lastname}
                        containerStyle={styles.formInput}
                />
                <Input placeholder="Email"
                        leftIcon={{type: 'font-awesome', name: 'envelope-o'}}
                        onChangeText={(email) => this.setState({email})}
                        value={this.state.email}
                        containerStyle={styles.formInput}
                />
                <CheckBox title="Remember Me"
                          center
                          checked={this.state.remember}
                          onPress={() => this.setState({remember: !this.state.remember})}
                          containerStyle={styles.formCheckbox}
                />
                <View style={styles.formButton}>
                    <Button onPress={()=> this.handleRegister()}
                             title = "Register"
                             icon={ <Icon name='user-plus'
                                          type='font-awesome' 
                                          color='white'
                                          size={24}
                                     />
                                  }
                             buttonStyle={{ backgroundColor : "purple"}}
                    />
                </View>
            </View>
            </>
        );
    }

}

const Login = createBottomTabNavigator()
function MyTabs() {
    return (
        <Login.Navigator initialRouteName="Login"
                         tabBarOptions={{
                                  activeTintColor: 'white',
                                  inactiveBackgroundColor: '#D1C4E9',
                                  activeBackgroundColor: '#9575CD',
                                  inactiveTintColor: 'gray'
                         }}
        >
            <Login.Screen name="Register" component={RegisterTAb} />
            <Login.Screen name="Login" component={LoginTab} />
        </Login.Navigator>
        );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        margin: 20
    },
    imageContainer:{
        // flex: 1,
        // flexDirection: 'row',
        margin: 20
    },
    image:{
        margin: 10,
        width: 80,
        height: 60
    },
    formInput: {
        margin: 20
    },
    formCheckbox: {
        margin: 20,
        backgroundColor: null
    },
    formButton:{
        margin: 10
    }
})

export default MyTabs;