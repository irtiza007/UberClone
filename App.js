import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Dimensions, ScrollView,Image } from 'react-native';
import {Icon} from 'native-base'
import { createDrawerNavigator,createAppContainer, createStackNavigator, StackActions, NavigationActions, createSwitchNavigator, SwitchNavigator, DrawerItems } from 'react-navigation';
import  LoginScreen from "./screens/LoginScreen";
import mapScreen from './screens/MapScreen';
import LoadingScreen from './screens/LoadingScreen';
import * as firebase from 'firebase';
import {firebaseConfig} from './config';
import {Permissions, ImagePicker,Camera } from 'expo';
firebase.initializeApp(firebaseConfig);
 class App extends React.Component {
  constructor(){
    super();
    this.state={
      image:null,
      avatar:null
    }
  }
  render() {
    
    
    return (
    <appStackNavigator />
    );
  }
}
_pickImage = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    allowsEditing: true,
    aspect: [4, 3],
  });

  console.log(result);

  if (!result.cancelled) {
    this.setState({ image: result.uri });
  }
};
const customDrawerItems = (props)=>(
  
  
  <View>
   <View style={{height:200, backgroundColor:'black', justifyContent:'center', padding:20}}>
   <View style={{flexDirection:'row', borderBottomColor:'#444444', borderBottomWidth:1, padding:5}}>
   <View style={{paddingRight:10}}>
   <TouchableOpacity onPress={async()=>{
       let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });
    
      console.log(result);
    
      if (!result.cancelled) {
        this.setState({ image: result.uri });
      }
   }}>
   <Image source={require('./assets/eggperson.jpg')} style={{height:60, width:60, borderRadius:30}}></Image>
   </TouchableOpacity>
   </View>
   <View style={{flexDirection:'column', padding:6, justifyContent:'center'}}>
   <Text style={{fontSize:22, color:'white' }}>Irtiza Hassan</Text>
   <View style={{flexDirection:'row', paddingRight:5}}>
   <Text style={{color:'#444444'}}>5.00 </Text>
   <View style={{justifyContent:'center',}}>
   <Icon name='ios-star' style={{color:'#444444', fontSize:13}} />
   </View>
   </View>
   </View>
   </View>
   </View>
     <ScrollView>
       <DrawerItems {...props} />
     </ScrollView>
     </View>
 )
const appStackNavigator=createStackNavigator({
  LoginScreen:{screen: LoginScreen,
    navigationOptions: {
      header: null
    }
  
  },
  LoadingScreen:{screen: LoadingScreen,
    navigationOptions: {
      header: null
    },
  },
  mapScreen:createDrawerNavigator({
     BookRide:mapScreen,
     LogOut:{screen: LoginScreen,
      navigationOptions: {
        header: null,
        drawerLockMode: 'locked-closed'
      },
      

     
    }, 
  },
 
 
  {
    navigationOptions: {
      header: null,
     
    },
    contentComponent:customDrawerItems,
  },

    
    
 
  ),
},
{
  initialRouteName: 'LoginScreen'
}
);



export default createAppContainer(appStackNavigator);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
