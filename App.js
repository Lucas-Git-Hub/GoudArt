import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Settings from './screens/Settings';
import Map from './screens/Map';
import Listview from './screens/Listview';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useEffect, useState } from 'react';

import * as Location from 'expo-location';

const Tab = createBottomTabNavigator();

const App = () => {
    const [sights, setSights] = useState(undefined);
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
  
    useEffect(() => { //Ask permission to use location
      (async () => {
        
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }
  
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
      })();
    }, []);
  
    let text = 'Waiting..';
    if (errorMsg) {
      text = errorMsg;
    } else if (location) {
      text = JSON.stringify(location);
    }

    // Get data
    async function getLocationData(){
      try {
      await fetch("https://lucas-git-hub.github.io/jsonFetch/gouda-sights.json", {
          method: 'GET',
          headers: {Accept: 'application/json'}
      })
      .then(res => res.json())
          .then(data => {
              setSights(data);
              console.log('Succes')
          })

      } catch (error) {
          console.log(error);
      }
  }

  //Load in data each time you enter the app for updates
  useEffect(() => {
      getLocationData();
  }, [])

  if(sights === undefined) //Wait for data to be loaded before showing screens
    {
      return <Text>still loading...</Text>
    }

  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName='Map'>
        <Tab.Screen
          name="Map"
          component={Map}
          initialParams={{ sights: sights}}
          options= {{ headerShown: false }}
        />
        <Tab.Screen
          name="Locations"
          component={Listview}
          initialParams={{ sights: sights}}
        />
        <Tab.Screen
          name="Settings"
          component={Settings}
        />
      </Tab.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;