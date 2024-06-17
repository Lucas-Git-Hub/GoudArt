import { useEffect, useState } from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Settings = () => {
    const [DarkMode, SetDarkMode] = useState(false);
    const toggleSwitch = () => SetDarkMode(previousState => !previousState) // Update state;

    const getData = async () => {
        try {
          const value = await AsyncStorage.getItem('theme');
          if (value !== null) {
            // value previously stored
            if(value == "Dark")
            {
                SetDarkMode(true);
            } else {
                SetDarkMode(false);
            }
          }
        } catch (e) {
          // error reading value
          console.log(e)
        }
      };

    useEffect(() => {
        getData();
    }, [])

    const storeData = async (value) => {
        try {
          await AsyncStorage.setItem('theme', value);
        } catch (e) {
          // saving error
          console.log(e);
        }
      };

    useEffect(() => {
        if(DarkMode)
        {
            storeData("Dark") // Save new state in asyncstorage
        } else {
            storeData("Light") // Save new state in asyncstorage
        }
    }, [DarkMode])

    return (
        <View style={DarkMode ? stylesDark.container : stylesLight.container}>
            <Text>Settings</Text>
            <Switch 
                trackColor={{false: '#81b0ff', true: '#767577'}}
                thumbColor={DarkMode ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={DarkMode}
            />
        </View>
    );
}

const stylesLight = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
});

const stylesDark = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#000',
      alignItems: 'center',
      justifyContent: 'center',
    },
});
  
export default Settings;