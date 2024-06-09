import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Settings from './components/Settings';
import Map from './components/Map';
import Listview from './components/Listview';
import { useState } from 'react';

const Stack = createNativeStackNavigator();

const App = () => {
  const [sightsLocations, setSightsLocations] = useState([]);
  const [currentLocation, setCurrentLocation] = useState([]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Map'>
        <Stack.Screen
          name="Map"
          component={Map}
          options= {{ headerShown: false }}
        />
        <Stack.Screen
          name="Locations"
          component={Listview}
        />
        <Stack.Screen
          name="Settings"
          component={Settings}
        />
      </Stack.Navigator>
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