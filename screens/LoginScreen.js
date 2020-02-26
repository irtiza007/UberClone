
import React from 'react';
import {KeyboardAvoidingView,Dimensions,Animated,Image, TouchableOpacity, StyleSheet, Text, View, TextInput } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation';
import {Icon} from 'native-base'
import firebase from 'firebase'
import LoadingScreen from './LoadingScreen';
//import Expo from 'expo'
const SCREEN_HEIGHT = Dimensions.get('window').height;
export default class LoginScreen extends React.Component {
  constructor(){
super();
this.state={
  justifyNum:'center',
  flex:1,
  editable:false,
  disabled:false,
  
  showGetMoving:true,
  arrow:false,
  animation:'',
  arrowBottom:false,
  placeholder:'Enter your mobile number',
  behavior:'position', 
  multiline:true

}

  }
   onSignIn= async(googleUser)=> {
    console.log('Google Auth Response', googleUser);
    
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    var unsubscribe = firebase.auth().onAuthStateChanged(function(firebaseUser) {
      unsubscribe();
      // Check if we are already signed-in Firebase with the correct user.
      if (!this.isUserEqual(googleUser, firebaseUser)) {
        // Build Firebase credential with the Google ID token.
        var credential = firebase.auth.GoogleAuthProvider.credential(
          googleUser.idToken,
          googleUser.accessToken);
        // Sign in with credential from the Google user.
        firebase.
        auth().signInAndRetrieveDataWithCredential(credential)
        .then(function(result) {
          // Handle Errors here.
          console.log('user SignIn');
          firebase
          .database()
          .ref('/users/' + result.user.uid)
          .set({
            gmail:result.user.email,
            local:result.additionalUserInfo.profile.local,
            first_name:result.additionalUserInfo.profile.given_name,
            
          })
        


        })
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
        });
      } else {
        console.log('User already signed-in Firebase.');
      }
    }.bind(this));
  }
 isUserEqual =(googleUser, firebaseUser) =>{
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
            providerData[i].uid === googleUser.getBasicProfile().getId()) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  }
  signInWithGoogle= async () => {
   
    try{
    
      const result= await Expo.Google.logInAsync({
        behavior:'web',
        androidClientId:'227734756836-2a4l7qg55bbq19494gtgjg2vm1sf2pki.apps.googleusercontent.com',
        iosClientId:'227734756836-b6gp3gqbsqeb9lme815nhouk5suhdp18.apps.googleusercontent.com',
        scopes:['profile', 'email'],

      });
      if(result.type===true){
        this.onSignIn(result);
     this.props.navigation.navigate('LoadingScreen');
        result.accessToken;
        
      }
      else{
        this.props.navigation.navigate('LoadingScreen');
        return{cancelled:true}
      }
    }
    catch(e){
      return{error:true
      }

    }
  }
  static navigationOptions={
    header:null,

  }
  

  componentWillMount(){
    this.loginHeight= new Animated.Value(160);
  }
  _login=()=>{
    this.props.navigation.dispatch(StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'mapScreen'})
      ],
    }));
  }
  increaseHeightOfLogin=()=>{
    Animated.timing(this.loginHeight,{
      toValue:SCREEN_HEIGHT,
      duration:500
    }).start()
    this.setState({animation:'slideInLeft',justifyNum:'flex-start',
    arrowBottom:true, placeholder:'0301 1234567',
    flex:0, editable:true, disabled:true, showGetMoving:false, arrow:true,multiline:false})
  }
  decreaseHight=()=>{
    Animated.timing(this.loginHeight,{
      toValue:150,
      duration:500
    }).start()
    this.setState({
      placeholder:'Enter your mobile number',
      multiline:true,
      arrowBottom:false,arrow:false ,showGetMoving:true,justifyNum:'center', flex:0, editable:false, disabled:false,})
  }
  render() {
    const marginTop = this.loginHeight.interpolate({
      inputRange:[150,SCREEN_HEIGHT],
      outputRange:[25,100]
    })
    const headerBackArrowOpacity = this.loginHeight.interpolate({
      inputRange:[150,SCREEN_HEIGHT],
      outputRange:[0,1]
    })
    return (
    <View style={{flex:1, backgroundColor:'#055FFB' } }>
     
    <View style={{flex:1, justifyContent:'center', alignItems:'center',   }}>
        <Animatable.View style={{backgroundColor:'#ffff', height:120, width:120, alignItems:'center',
         justifyContent:'center',  }} animation="zoomIn" itrationCount={1}>
            <Text style={{
              fontSize:35, fontWeight:'500'
            }}>uber</Text>
        </Animatable.View>
    </View>
    {/* Input area  */}
    
    <Animatable.View animation='slideInUp' itrationCount={1} >
    
              <TouchableOpacity onPress={this.increaseHeightOfLogin} disabled={this.state.disabled}>
    <Animated.View
    style={{height:this.loginHeight, backgroundColor:'white', }}
    >

      {this.state.showGetMoving ? (
    <View style={{alignItems:'flex-start', paddingHorizontal:25, marginTop:25}}>
    <Text style={{fontSize:24, fontWeight:'500'}}>
      Get moving with Uber 
    </Text>
        
    </View>
            ) : null}
{this.state.arrow ? (
  
  <Animatable.View animation={this.state.animation} itrationCount={1}>
  <View
      style={{flex:0, height:60, width:60, padding:20, marginTop:25}}>
      <TouchableOpacity onPress={this.decreaseHight}>
        <Icon name='md-arrow-back' style={{color:'black'}}/>
      </TouchableOpacity>
      
    </View>
    <View style={{flex:1,alignItems:'flex-start', paddingBottom:30, paddingLeft:20}}>
    <Text style={{ fontSize:25, fontWeight:'bold'}}>
      Enter your mobile number
    </Text>
  </View>
  </Animatable.View>
): null}
    <View style={{marginTop:25, paddingHorizontal:25, flexDirection:'row', height: 40, justifyContent: 'center', flex: 1, }}>
            <View style={{
                flex:0,
                justifyContent:this.state.justifyNum,
                alignItems: 'center',
                
            }}>
            <Image source={require('../assets/Pakistan.png')} style={{width:30, height:30, resizeMode:'contain'}} />
            </View>
            <View style={{
                flex:1,
                justifyContent:this.state.justifyNum,
                alignItems: 'center',
               
            }}>
            <Text style={{fontSize:20, textAlign: 'center'}}>+92</Text>            
            </View>   
            <View
            style={{
              flexDirection:'row',
              flex:3,
              justifyContent:this.state.justifyNum,
              alignItems: 'flex-start',
            
              
          }}>
              <TextInput placeholder={this.state.placeholder} style={{ flex: 0, fontSize: 20 }} editable={this.state.editable} multiline={this.state.multiline}></TextInput>
            </View>
            
    </View>
    {this.state.arrowBottom ? (
      <KeyboardAvoidingView behavior={this.state.behavior}  >
    <View style={{ padding:20,alignItems:'flex-end'}}>
    <TouchableOpacity onPress={this._login}>
      <View style={{height:70,width:70, backgroundColor:'black', alignItems:'center', borderRadius:35, justifyContent:'center'}}>
      <Icon name='md-arrow-round-forward' style={{color:'white'}}/>
      </View>
      </TouchableOpacity>
    </View>
    </KeyboardAvoidingView>
    ):  null }
    </Animated.View>
    
    </TouchableOpacity>
   
    {/* bottom area last */} 
    <View style={{height:70,
    backgroundColor:'white',
    alignItems:'flex-start',
    justifyContent:'center',
    borderTopColor:'#e8e8ec',
    borderTopWidth:1,
    paddingHorizontal:25
    }}>
    <TouchableOpacity onPress={this.signInWithGoogle}>
        <Text
        style={{color:'#3895D3', 
      fontWeight:'500'}}
        > or connect with google </Text>
        </TouchableOpacity>
    </View>


   </Animatable.View>
   
    </View>
    
        );
       
  }
}
