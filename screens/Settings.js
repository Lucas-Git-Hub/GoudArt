import { useEffect } from 'react';
import { Platform, Pressable, StyleSheet, Switch, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TextButton from '../components/TextButton';
import TextSwitch from '../components/TextSwitch';

const Settings = ( { theme, setTheme, getTheme } ) => {
    const styleTheme = theme ? stylesDark : stylesLight
    const toggleSwitch = () => setTheme(previousState => !previousState) // Update state when switched;

    const storeTheme = async (value) => {
        try {
            await AsyncStorage.setItem('theme', value);
        } catch (e) {
            // saving error
            console.log(e);
        }
    };

    // Clear storage based on OS (asyncStorage.clear() gives error on iphone)
    const clearAsyncStorage = async() => {
        const AsyncStorageKeys = await AsyncStorage.getAllKeys();
        if(AsyncStorageKeys.length > 0){
            if(Platform.OS === 'android'){
                await AsyncStorage.clear();
                console.log("Data Cleared");
                // Update to default settings
                getTheme();
            }
            if(Platform.OS === 'ios'){
                await AsyncStorage.multiRemove(AsyncStorageKeys);
                console.log("Data Cleared");
                // Update to default settings
                getTheme();
            }
        }
    }
    
    // Store new darkmode state when it is changed in asyncstorage
    useEffect(() => {
        theme ? storeTheme("Dark") : storeTheme("Light");
    }, [theme])

    return (
        <View style={styleTheme.container}>
            <View style={styleTheme.settingContainer}>
                <TextSwitch
                    theme={theme}
                    text={`Theme: ${theme ? 'Dark' : 'Light'}`}
                    value={theme}
                    onValueChangeFunction={toggleSwitch}
                    
                />
            </View>
            <View style={styleTheme.settingContainer}>
                <TextButton
                    theme={theme}
                    text="Clear Data"
                    onPressFunction={clearAsyncStorage}
                />
            </View>
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
    },
    settingContainer: {
        flex: 0.1,
        alignItems: 'center',
        justifyContent: 'center'
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
    },
    settingContainer: {
        flex: 0.1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
  
export default Settings;