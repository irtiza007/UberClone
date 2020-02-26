import React from 'react';
import { ScrollView,TouchableOpacity,Image,StyleSheet, Text, View,Dimensions } from 'react-native';
import MapView,{ Polyline } from 'react-native-maps';

import * as Animatable from 'react-native-animatable';
import { createDrawerNavigator,createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation';
import { Icon } from 'native-base';
import { TextInput } from 'react-native-gesture-handler';
import _ from 'lodash';
import { Ionicons } from '@expo/vector-icons';
import GestureHandler from 'react-native-gesture-handler';
import SwipeUpDown from 'react-native-swipe-up-down';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

export default class mapScreen extends React.Component {
    constructor(){
        super();
        this.state={
        currentLongitude:33.738045 ,
      currentLatitude: 73.084488,
      predictions:{
        results: {},
        ahmed:'',
      currentAddress:'',
      showSearchArea:false,
        height:'',
        width:'',
        pridictionsView:false,
        flexDirection:'flex-start',
        heightPridictions:'100%',
        position:'relative',
        scrollEnabled:true
        
   
      },
      destination:''
        }
    }
    
    onSwipeUp=()=> {
      //alert('hi ')
      this.setState({ heightPridictions:'100%', widthPridition:'100%', flexDirection:'flex-end', position:'relative', scrollEnabled:true});
    }
  
    onSwipeDown=()=> {
      
      this.setState({ heightPridictions:'20%', flexDirection:'flex-start', position:'absolute', scrollEnabled:false });
    }
    
    Animation=async()=>{
      console.log(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=33.7212782,73.0796787&radius=1500&key=AIzaSyDa34ta44BSV5Unvk7ejsMbj12jMI2GW7Y
      `)
      return fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${this.state.currentLatitude},${this.state.currentLongitude}&radius=1500&key=AIzaSyDa34ta44BSV5Unvk7ejsMbj12jMI2GW7Y
      `)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson.results[0].name);
        this.setState({
          isloading: false,
              predictions: responseJson,
          showSearchArea:true,
        currentAddress:responseJson.results[0].name,
        pridictionsView:true,
        

        })
     

      })
      .catch((error) => {
        console.error(error);
      });
      
   
    }
  backToMap=()=>{
      this.setState({
        height:'',
        width:'',
        showSearchArea:false,
        pridictionsView:false
      })
    }
    searchPlaces = (destination) => {
      this.setState({destination})
    //  console.log(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${this.state.currentLatitude},${this.state.currentLongitude}&radius=1500&key=AIzaSyBlFCXSUnH5zskXVGtJIERiyrcqJ-IoFds`);
      return fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${this.state.currentLatitude},${this.state.currentLongitude}&radius=1500&key=AIzaSyDa34ta44BSV5Unvk7ejsMbj12jMI2GW7Y
      `)      .then((response) => response.json())
          .then((responseJson) => {
    
            this.setState(
              {
                isloading: false,
                predictions: responseJson,
                
              }
    
            )
    
            const pridictions = (this.state.pridictions);
            //onsole.log(pridictions);
    
          })
          .catch((error) => {
            console.error(error);
          });
      }
    
    componentDidMount = () => {
        navigator.geolocation.getCurrentPosition(
          //Will give you the current location
          position => {
            const currentLongitude = position.coords.longitude;
            //getting the Longitude from the location json
            const currentLatitude = position.coords.latitude;
            //getting the Latitude from the location json
            this.setState({ currentLongitude: currentLongitude, currentLatitude: currentLatitude });
            //Setting state Latitude to re re-render the Longitude Text
          },
    
        );
        this.watchID = navigator.geolocation.watchPosition(position => {
          //Will give you the location on location change
          console.log(position);
          const currentLongitude = JSON.stringify(position.coords.longitude);
          //getting the Longitude from the location json
          const currentLatitude = JSON.stringify(position.coords.latitude);
          //getting the Latitude from the location json
          this.setState({ currentLongitude: currentLongitude });
          //Setting state Longitude to re re-render the Longitude Text
          this.setState({ currentLatitude: currentLatitude });
          //Setting state Latitude to re re-render the Longitude 
       },
       (error)=>alert(JSON.stringify(error)),{
         enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 
       }
        

        );
      };
      componentWillUnmount = () => {
       navigator.geolocation.clearWatch(this.watchID);
      };
    
   static navigationOptions={
        header:null
    }
    changeLocation=(lat, long)=>{
      console.log(lat);
  
      _mapView.animateToRegion({
        latitude:lat, 
        longitude:long,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
  
      }, 1000)
      this.setState({
        showSearchArea:false,
        pridictionsView:false
      })
    }
    
  render() {
    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80,
    
    
    };
    const predictions = _.map(this.state.predictions.results, (data, index) => 
    <TouchableOpacity key={data['id']}  onPress = {() => this.changeLocation(data['geometry']['location']['lat'], data['geometry']['location']['lng'])}>
        <View style={{ justifyContent:'flex-start',
         paddingRight:5,
         paddingLeft:5, backgroundColor:'white',borderBottomColor:'black', 
         borderBottomWidth:1, flexDirection:'row' }}>
         <View style={{justifyContent:'center', paddingRight:10}}>
         <Icon name='ios-car' />
         </View>
         <View style={{justifyContent:'center'}}>

    <Text key={data['id']} style={{backgroundColor:'white', height:50,  }}>{data['vicinity']}</Text>
    </View>
    </View>
        </TouchableOpacity>
    
    );

 
    return (
     
    <View  style={styles.container} >
    <View style={styles.map}>
        <MapView style={styles.map}
        ref = {(mapView) => { _mapView = mapView; }}
              
              initialRegion={{
                latitude:this.state.currentLongitude ,
                longitude:this.state.currentLatitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              showsUserLocation
              followsUserLocation
              >
              <MapView.Marker
                      coordinate={{
                        latitude:this.state.currentLatitude,
                        longitude:this.state.currentLongitude ,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                      }}
                      title={'Car'}
                      discription={'Cars Near You'}
                      
                      >
                       <Ionicons name='ios-flag' style={{color:'black', fontSize:45}} />
                      </MapView.Marker>
                
              </MapView>
     
              </View>
         {this.state.showSearchArea ?(
        <Animatable.View animation='slideInDown' style={{/*height:this.state.height, width:this.state.width,*/ backgroundColor:'white'}}>
          
          
          <View
      style={{flex:0, height:60, width:60, padding:20, marginTop:25}}>
      <TouchableOpacity onPress={ () => this.backToMap()}>
        <Icon name='md-arrow-back' style={{color:'black'}}/>
      </TouchableOpacity>
      
    </View>
  
        <View style={styles.currentAddress}>
        
        <View style={{justifyContent:'center', paddingRight:10}}>
        <Ionicons name="ios-radio-button-on" style={{fontSize:8, fontWeight:'bold'}} color="black" />

        </View>
        <View style={{flex:1}}>
          <TextInput value={this.state.currentAddress}  style={{fontSize:18,borderColor:'black', borderWidth:1, padding:5  }}  />
          </View>
        </View>
        <View>
          
        <View style={styles.searchArea}>
        <View style={{justifyContent:'center', paddingRight:10}}>
        <Icon name='ios-square' style={{fontSize:12}} />
        </View>
        <View style={{flex:1, paddingRight:20 }}>
        
                                <TextInput 
         placeholder='Where to?'
         value={this.state.destination}
         onChangeText={destination=> this.searchPlaces(destination)}
          style={{fontSize:18,borderColor:'black', borderWidth:1, padding:5  }}
         />
         </View>

         <View>
         <Ionicons name="ios-add" style={{fontSize:40, fontWeight:'bold'}} color="black" />

                
         </View>
         </View>   
            </View>
                      </Animatable.View>
                      ):(
                        <View>
              {
              <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
              <View style={styles.menu}>
        <Icon name='md-menu' style={{color:'black', fontSize:35}} />
        
        </View>
    
              </TouchableOpacity>}
              
        <Animatable.View  animation='slideInDown' style={{ alignItems:'center', padding:20, }}>
        
        <View style={{backgroundColor:'white',}}>
              <View style={styles.searchInput}>
        <View style={styles.squre}>

        <Icon name='ios-square' style={{fontSize:8}} />
        </View>
        <TouchableOpacity onPress={() => this.Animation()}>
        <View style={styles.whereTo}>
        <Text style={{fontSize:18, }}>Where to?</Text>
        </View>
        </TouchableOpacity>
        <View style={styles.car}>
            <Icon name='ios-car' style={{color:'black'}} />
        </View>
        
        </View>
        
        </View>
         {/** */}
            
            
            </Animatable.View>
          
                     
         </View>
                      )}
        
    {this.state.pridictionsView ?(
      <GestureRecognizer
      onSwipeUp={() => this.onSwipeUp()}
      onSwipeDown={() => this.onSwipeDown()}
      config={config}
      style={{
        position:this.state.position,
        alignItems:this.state.flexDirection,
        height:this.state.heightPridictions,
        bottom:0
       // backgroundColor: this.state.backgroundColor
      }}
      >
       
        <Animatable.View  animation="slideInUp" iterationCount={1}>
          <ScrollView scrollEnabled={this.state.scrollEnabled}>
       
            {predictions}
         
            </ScrollView >
            </Animatable.View>
    </GestureRecognizer>
      
            ):null}
            
            
             </View>
        
            
    
                      )
                    }
 
}
const styles = StyleSheet.create({
    container: {
      flex:1,
     //alignItems:'center',
     //justifyContent:'center',
    },
    map:{
        position:'absolute',
        top:0,
        bottom:0,
        left:0,
        right:0,

        
    },
    menu:{
        padding:20,
        marginTop:13
       // backgroundColor:'black',
        
    },
    searchInput:{
        flexDirection:'row',
        backgroundColor:'white',
        padding:20
    },
    squre:{
        paddingRight:15,
        justifyContent:'center',
    
    },
    whereTo:{
        flex:1,
        paddingRight:150
    },
    searchArea:{
      padding:20,
      justifyContent:'space-around',
      flexDirection:'row',
      
  

    },
    currentAddress:{
      padding:10,
      flexDirection:'row'
    
   
      
    }
    
});  