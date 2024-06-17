import { useEffect, useState } from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Settings = ( { route, theme, setTheme } ) => {
    const [styleTheme, setStyleTheme] = useState(stylesLight)
    const toggleSwitch = () => setTheme(previousState => !previousState) // Update state;

    const storeTheme = async (value) => {
        try {
          await AsyncStorage.setItem('theme', value);
        } catch (e) {
          // saving error
          console.log(e);
        }
      };
    
    useEffect(() => {   
        // Update theme if needed
        if(theme === true)
        {
            setStyleTheme(stylesDark)
        } else {
            setStyleTheme(stylesLight)
        }
    }, [theme])

    useEffect(() => { // Save new darkmode state when it is changed in asyncstorage
        if(theme)
        {
            storeTheme("Dark")
        } else {
            storeTheme("Light")
        }
    }, [theme])

    return (
        <View style={styleTheme.container}>
            <Text style={styleTheme.text}>Theme</Text>
            <Switch 
                trackColor={{false: '#81b0ff', true: '#767577'}}
                thumbColor={theme ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={theme}
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
    text: {
        color: '#000'
    }
});

const stylesDark = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#000',
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
        color: '#fff'
    }
});
  
export default Settings;