import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Settings from './screens/Settings';
import Map from './screens/Map';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Locations from './screens/Locations';

const Tab = createBottomTabNavigator();

const App = () => {
  const [resetData, setResetData] = useState(false);
  const [sights, setSights] = useState([]);
  const [theme, setTheme] = useState(false);
  const [userLocation, setUserLocation] = useState(null); // User his current location
  const [errorMsg, setErrorMsg] = useState(null); //Error message for when permission was denied
  const styleTheme = theme ? stylesDark : stylesLight; 
  
  //Ask permission to use location
  const askPermissionForUserLocation = async() => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setUserLocation(location);
    } catch (error) {
      console.log("Error requesting location permission:", error)
    }
  }

  // Get sight locations data
  const getLocationData = async () => {
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
  };

  const getTheme = async () => {
    try {
      const value = await AsyncStorage.getItem('theme');
      if (value !== null) {
        // Use saved theme
        value === "Dark" ? setTheme(true) : setTheme(false)
        console.log("Current Stored Theme: " + value)
      } else {
        // Use default theme if there's none saved
        setTheme(false);
        console.log("Default Theme")
      }
    } catch (e) {
      // error reading value
      console.log(e)
    }
  };

  //Load data in on startup
  useEffect(() => {
    if(sights.length === 0){ //Check if already fetched/list filled
      getLocationData();
    }
    askPermissionForUserLocation();
  }, [])

  //Load in theme on startup and when data gets reset
  useEffect(() => {
    if(resetData === true){
      getTheme();
      setResetData(false);
    }
  }, [resetData])
  
  return (
    <NavigationContainer>
      <StatusBar style={theme ? 'light' : 'dark'}/>
      <Tab.Navigator 
      initialRouteName='Locations'
      screenOptions={{
        tabBarStyle: styleTheme.tabContainer,
        tabBarLabelStyle: styleTheme.tabLabel
      }}>
        <Tab.Screen 
          name="Locations"
          options={{ 
            headerStyle: styleTheme.tabHeaderBackground, 
            headerTintColor: theme ? '#fff' : '#000', 
            tabBarIcon: () => (
              <FontAwesome name="map-signs" size={24} color='orange'/>
            ),
          }}
        >
          {(props) => <Locations {...props} sights={sights} theme={theme} resetData={resetData}/>}
        </Tab.Screen>
        <Tab.Screen 
          name="Map" 
          options={{ 
            headerShown: false,
            headerStyle: styleTheme.tabHeaderBackground, 
            headerTintColor: theme ? '#fff' : '#000',
            tabBarIcon: () => (
              <FontAwesome name="map" size={24} color='orange'/>
            ),
          }}
        >
          {(props) => <Map {...props} sights={sights} theme={theme}/>}
        </Tab.Screen>
        <Tab.Screen 
          name="Settings"
          options={{ 
            headerStyle: styleTheme.tabHeaderBackground, 
            headerTintColor: theme ? '#fff' : '#000',
            tabBarIcon: () => (
              <FontAwesome name="gear" size={24} color='orange'/>
            ),
          }}
        >
          {(props) => <Settings {...props} theme= {theme} setTheme={setTheme} getTheme={getTheme} setResetData={setResetData}/>}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
    
  );
}

const stylesLight = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabContainer: {
    backgroundColor: '#fff'
  },
  tabHeaderBackground: {
    backgroundColor: '#fff',
  }
});

const stylesDark = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabContainer: {
    backgroundColor: '#000'
  },
  tabHeaderBackground: {
    backgroundColor: '#000',
  }
});

export default App;