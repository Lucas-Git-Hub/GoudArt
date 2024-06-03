import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Settings from './components/Settings';
import Map from './components/Map';
import Listview from './components/Listview';
import { useState } from 'react';

let initialData;

async function getLocationData(){
  try {
    fetch("https://stud.hosted.hr.nl/0993934/prg07/gouda-sights.json", {
      method: 'GET',
      headers: {Accept: 'application/json'}
    })
    .then(res => res.json())
      .then(data => {
        initialData = data;
        console.log(initialData)
        console.log("Succes")
      })

  } catch (error) {
    console.log(error);
  }
}

const Tab = createBottomTabNavigator();

const App = () => {
  const [sightsLocations, setSightsLocations] = useState([]);
  const [currentLocation, setCurrentLocation] = useState([]);

  getLocationData();

  if(initialData)
    {
      setSightsLocations = initialData;
    }

  return (
    <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen 
            name="Map" 
            component={Map} 
            options={{ headerShown: false }}
          />
          <Tab.Screen 
            name="Locations" 
            component={Listview}
            initialParams={sightsLocations}
          />
          <Tab.Screen 
            name="Settings" 
            component={Settings}
          />
      </Tab.Navigator> 
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