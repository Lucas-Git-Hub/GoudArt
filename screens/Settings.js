import { useEffect } from 'react';
import { Platform, Pressable, StyleSheet, Switch, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
            <Text style={styleTheme.text}>Theme</Text>
            <Switch 
                trackColor={{false: '#81b0ff', true: '#767577'}}
                thumbColor={theme ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={theme}
            />
            <Pressable style={styleTheme.clearButton} onPress = {clearAsyncStorage}>
                <Text style={styleTheme.clearButton.text}>Clear Stored Data</Text>
            </Pressable>
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
    clearButton: {
        backgroundColor: '#fff',
        borderWidth: '1px solid',
        borderRadius: '5px',
        borderColor: '#000',
        text: {
            color: '#000'
        }
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
    clearButton: {
        backgroundColor: '#fff',
        borderWidth: '1px solid',
        borderRadius: '5px',
        borderColor: '#000',
        text: {
            color: '#000'
        }
    }
});
  
export default Settings;