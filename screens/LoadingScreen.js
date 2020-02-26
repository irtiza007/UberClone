import React from 'react';
import { StyleSheet, View,
    ActivityIndicator,
    } from 'react-native';
    import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation';
    
    import firebase from 'firebase';
export default class LoadingScreen extends React.Component {
    componentDidMount(){
        this.checkIfLoggedIn();
    }
checkIfLoggedIn = () =>{
    firebase.auth()
    
    .onAuthStateChanged(user =()=>
    {
        if (user){
            this.props.navigation.dispatch(StackActions.reset({
                index: 0,
                actions: [
                  NavigationActions.navigate({ routeName: 'mapScreen'})
                ],
              }));

        }
        else {
            this.props.navigation.dispatch(StackActions.reset({
                index: 0,
                actions: [
                  NavigationActions.navigate({ routeName: 'LoginScreen'})
                ],
              }));
        }
    }
    )
}
    

    render() {
      
      return (
          <View style={styles.container}>
    <ActivityIndicator size='large' />
    </View>
      );
    }
  }
  

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  