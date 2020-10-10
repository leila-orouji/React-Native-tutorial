import React from 'react';
import Menu from './MenuComponent';
import Home from './HomeComponent';
import DishDetail from './DishDetailComponent';
import { View, Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';



const stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function MenuNavigator() {
  return (
    <stack.Navigator initialRouteName='Menu'>
      <stack.Screen name="Menu" component={Menu} options={{
                    headerStyle:{backgroundColor: '#512DAB'},
                    headerTintColor: '#fff',
                    headerTitleStyle: {color: '#fff'}
      }} />
      <stack.Screen name="DishDetail" component={DishDetail} options={{
                    headerStyle:{backgroundColor: '#512DAB'},
                    headerTintColor: '#fff',
                    headerTitleStyle: {color: '#fff'}
      }} />
    </stack.Navigator>
  );
}

function HomeNavigator() {
  return (
    <stack.Navigator>
      <stack.Screen name="Home" component={Home} options={{
                  headerStyle:{backgroundColor: '#512DAB'},
                  headerTintColor: '#fff',
                  headerTitleStyle: {color: '#fff'}
    }} />
    </stack.Navigator>
  );
}


const AppNavigator = () => ( 
    <NavigationContainer>
        <Drawer.Navigator initialRouteName="Home">
             <Drawer.Screen name="Menu" component={MenuNavigator} />
             <Drawer.Screen name="Home" component={HomeNavigator} />
        </Drawer.Navigator>
    </NavigationContainer>
  );
  
 

class Main extends React.Component {
    render() {
        return (
            <View style={{flex: 1, paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight}}>
                <AppNavigator />
            </View>
        )
    }
}


export default Main;