import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Settings from './screens/Settings';
import Map from './screens/Map';
import Listview from './screens/Listview';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const Tab = createBottomTabNavigator();

const App = () => {
    const [sights, setSights] = useState([]);
    const [theme, setTheme] = useState(false);
    const [location, setLocation] = useState(null); // User's current location
    const [errorMsg, setErrorMsg] = useState(null);
    const styleTheme = theme ? stylesDark : stylesLight; 
  
    //Ask permission to use location
    useEffect(() => { 
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

    // Get sight locations data
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
  };

  const getTheme = async () => {
    try {
      const value = await AsyncStorage.getItem('theme');
      if (value !== null) {
        // Use saved theme
        value === "Dark" ? setTheme(true) : setTheme(false)
        console.log(value)
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

  //Load in data each time you enter the app for updates (on startup)
  useEffect(() => {
    getLocationData();
    getTheme();
  }, [])

  return (
    <NavigationContainer>
      <Tab.Navigator 
      initialRouteName='Locations'
      screenOptions={{
        tabBarStyle: styleTheme.tabContainer,
        tabBarLabelStyle: styleTheme.tabLabel
      }}>
        <Tab.Screen 
          name="Map" 
          options={{ 
            headerStyle: styleTheme.tabHeaderBackground, 
            headerTintColor: theme ? '#fff' : '#000',
            tabBarIcon: () => (
              <FontAwesome name="map" size={24} color={theme ? 'white' : 'black'}/>
            ),
          }}
        >
          {(props) => <Map {...props} sights={sights} theme={theme}/>}
        </Tab.Screen>
        <Tab.Screen 
          name="Locations"
          options={{ 
            headerStyle: styleTheme.tabHeaderBackground, 
            headerTintColor: theme ? '#fff' : '#000', 
            tabBarIcon: () => (
              <FontAwesome name="map-signs" size={24} color={theme ? 'white' : 'black'}/>
            ),
          }}
        >
          {(props) => <Listview {...props} sights={sights} theme={theme}/>}
        </Tab.Screen>
        <Tab.Screen 
          name="Settings"
          options={{ 
            headerStyle: styleTheme.tabHeaderBackground, 
            headerTintColor: theme ? '#fff' : '#000',
            tabBarIcon: () => (
              <FontAwesome name="gear" size={24} color={theme ? 'white' : 'black'}/>
            ),
          }}
        >
          {(props) => <Settings {...props} theme= {theme} setTheme={setTheme} getTheme={getTheme}/>}
        </Tab.Screen>
      </Tab.Navigator>
      <StatusBar style="auto" />
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