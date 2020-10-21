import React from 'react';
import Menu from './MenuComponent';
import Home from './HomeComponent';
import About from './AboutComponent';
import Contact from './ContactComponent';
import DishDetail from './DishDetailComponent';
import Reservation from './ReservationComponent';
import Favorites from './FavoriteComponent';
import Login from './LoginComponent';
import {Text, View, Platform, Image, StyleSheet, ScrollView } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator, DrawerItemList} from '@react-navigation/drawer';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import {Icon} from 'react-native-elements';
import { connect } from 'react-redux';
// import{ fetchdishes, fetchleaders, fetchcomments, fetchpromotions} from './../redux/actionCreator';
import get_data from './../api/get_data'
import { addComments, addPromotions, addLeaders, addDishes} from './../redux/actionCreator'


const stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function LoginNavigator() { 
  return (
    <stack.Navigator >
      <stack.Screen name="Login" component={Login}  options={({ navigation })=>
                       ({
                        headerLeft: ()=> <Icon name='sign-in' size={24} color='white' 
                                  onPress={() => navigation.toggleDrawer()} />,
                                  title: 'login',
                                  drawerLabel: 'login',
                                  headerStyle:{backgroundColor: '#512DAB'},
                                  headerTintColor: '#fff',
                                  headerTitleStyle: {color: '#fff'}
                    })
    } />
    </stack.Navigator>
  );
}

function MenuNavigator() {
  return (
    <stack.Navigator initialRouteName='Menu'>
      <stack.Screen name="Menu" component={Menu} 
                    options={({ navigation })=>
                       ({
                        headerLeft: ()=> <Icon name='menu' size={24} color='white' 
                                  onPress={() => navigation.toggleDrawer()} />,
                                  title: 'Menu',
                                  drawerLabel: 'Menu',
                                  headerStyle:{backgroundColor: '#512DAB'},
                                  headerTintColor: '#fff',
                                  headerTitleStyle: {color: '#fff'}
                    })
                  
             } />
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
    <stack.Navigator >
      <stack.Screen name="Home" component={Home}  options={({ navigation })=>
                       ({
                        headerLeft: ()=> <Icon name='menu' size={24} color='white' 
                                  onPress={() => navigation.toggleDrawer()} />,
                                  title: 'home',
                                  drawerLabel: 'home',
                                  headerStyle:{backgroundColor: '#512DAB'},
                                  headerTintColor: '#fff',
                                  headerTitleStyle: {color: '#fff'}
                    })
    } />
    </stack.Navigator>
  );
}

function AboutNavigator() {
  return (
    <stack.Navigator>
      <stack.Screen name="About" component={About}  options={({ navigation })=>
                       ({
                        headerLeft: ()=> <Icon name='menu' size={24} color='white' 
                                  onPress={() => navigation.toggleDrawer()} />,
                                  title: 'about',
                                  drawerLabel: 'about',
                                  headerStyle:{backgroundColor: '#512DAB'},
                                  headerTintColor: '#fff',
                                  headerTitleStyle: {color: '#fff'}
                    })
    } />
    </stack.Navigator>
  );
}

function ContactNavigator() {
  return (
    <stack.Navigator>
      <stack.Screen name="Contact" component={Contact}  options={({ navigation })=>
                       ({
                        headerLeft: ()=> <Icon name='menu' size={24} color='white' 
                                  onPress={() => navigation.toggleDrawer()} />,
                                  title: 'contact',
                                  drawerLabel: 'contact',
                                  headerStyle:{backgroundColor: '#512DAB'},
                                  headerTintColor: '#fff',
                                  headerTitleStyle: {color: '#fff'}
                    })
    } />
    </stack.Navigator>
  );
}

function ReservationNavigator() { 
  return (
    <stack.Navigator >
      <stack.Screen name="Reservation" component={Reservation}  options={({ navigation })=>
                       ({
                        headerLeft: ()=> <Icon name='cutlery' size={24} color='white' 
                                  onPress={() => navigation.toggleDrawer()} />,
                                  title: 'Reservation',
                                  drawerLabel: 'Reservation',
                                  headerStyle:{backgroundColor: '#512DAB'},
                                  headerTintColor: '#fff',
                                  headerTitleStyle: {color: '#fff'}
                    })
    } />
    </stack.Navigator>
  );
}

function FavoriteNavigator() {
  return (
    <stack.Navigator>
      <stack.Screen name="favorite" component={Favorites}  options={({ navigation })=>
                       ({
                        headerLeft: ()=> <Icon name='heart' size={24} color='red' 
                                  onPress={() => navigation.toggleDrawer()} />,
                                  title: 'Favorites',
                                  drawerLabel: 'Favorites',
                                  headerStyle:{backgroundColor: '#512DAB'},
                                  headerTintColor: '#fff',
                                  headerTitleStyle: {color: '#fff'}
                    })
    } />
    </stack.Navigator>
  );
}

const AppNavigator = () => ( 
  
    <NavigationContainer>
        <Drawer.Navigator initialRouteName="Home" drawerStyle={{backgroundColor:'#D1C4E9'}} drawerContent= {CustomDrawerContentComponent} >
             <Drawer.Screen name="Login" component={LoginNavigator} options={{
                  drawerIcon: ({tintColor}) => (
                    <Icon name='sign-in' type='font-awesome' size={24} color={tintColor}  />
                    ),}}/>
             <Drawer.Screen name="Menu" component={MenuNavigator} options={{
                  drawerIcon: ({tintColor}) => (
                    <Icon name='list' type='font-awesome' size={24} color={tintColor}  />
                    ),}}/>
             <Drawer.Screen name="Home" component={HomeNavigator} options={{
                  drawerIcon: ({tintColor}) => (
                    <Icon name='home' type='font-awesome' size={24} color={tintColor}  />
                  ),}}/>
             <Drawer.Screen name="About" component={AboutNavigator} options={{
                  drawerIcon: ({tintColor}) => (
                    <Icon name='info-circle' type='font-awesome' size={24} color={tintColor}  />
                    ),}}/>
             <Drawer.Screen name="Contact" component={ContactNavigator} options={{
                  drawerIcon: ({tintColor}) => (
                    <Icon name='address-card' type='font-awesome' size={22} color={tintColor}  />
                  )}}/>
             <Drawer.Screen name="Reservation" component={ReservationNavigator} options={{
                  drawerIcon: ({tintColor}) => (
                    <Icon name='cutlery' type='font-awesome' size={22} color={tintColor}  />
                  )}}/>
              <Drawer.Screen name="Favorites" component={FavoriteNavigator} options={{
                  drawerIcon: ({tintColor}) => (
                    <Icon name='heart' type='font-awesome' size={22} color={tintColor}  />
                  )}}/>              
              
        </Drawer.Navigator> 
    </NavigationContainer>
    
  );
  
const CustomDrawerContentComponent = (props)=>{
  return(
    <ScrollView>
    <SafeAreaView style={Styles.container} forceInset={{top: 'always', horizontal: 'never'}}>
      <View style={Styles.drawerHeader}>
        <View style={{flex: 1}}>
          <Image source={require('./images/images1.png')} style={Styles.drawerImage}/>
        </View>
        <View style={{flex: 2}}>
          <Text style={Styles.drawerHeaderText}>Tutorial for react native</Text>
        </View>
      </View>
      <DrawerItemList {...props} />
    </SafeAreaView>
  </ScrollView>
  )
}
  


class Main extends React.Component {
  componentDidMount(){
    // this.props.fetchdishes();
    // this.props.fetchcomments();
    // this.props.fetchleaders();
    // this.props.fetchpromotions();
    
    get_data.getdishes((dishes)=> this.props.addDishes(dishes))
    get_data.getcomments((comments)=> this.props.addComments(comments))
    get_data.getpromotions((pro)=> this.props.addPromotions(pro))
    get_data.getleaders((lead)=> this.props.addLeaders (lead))

  }
    render() {
        return (
          <SafeAreaProvider>
            <View style={{flex: 1, paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight}}>
                <AppNavigator />
            </View>
            </SafeAreaProvider>
        )
    }
}


const Styles = StyleSheet.create({
  container:{
    flex: 1
  },
  drawerHeader:{
    backgroundColor: '#152DAB',
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row'
  },
  drawerHeaderText:{
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold'
  },
  drawerImage:{
    margin: 10,
    width: 80,
    height:60
  }
})

const mapDispatchToProps = dispatch =>{
  return{
    // fetchdishes: ()=> dispatch(fetchdishes()),
    // fetchcomments: ()=> dispatch(fetchcomments()),
    // fetchpromotions: ()=> dispatch(fetchpromotions()),
    // fetchleaders: ()=> dispatch(fetchleaders()),
    addDishes : (dishes)=> dispatch(addDishes(dishes)),
    addComments : (com)=> dispatch(addComments(com)),
    addPromotions : (pro)=> dispatch(addPromotions(pro)),
    addLeaders : (lead)=> dispatch(addLeaders (lead)),
  }
}

export default connect(null, mapDispatchToProps)(Main);