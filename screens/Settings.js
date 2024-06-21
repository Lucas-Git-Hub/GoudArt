import { useEffect } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import IconTextSwitch from '../components/IconTextSwitch';
import ScreenWidthTextButton from '../components/ScreenWidthTextButton';

const Settings = ( { theme, setTheme, setResetData } ) => {
    const styleTheme = theme ? stylesDark : stylesLight
    const toggleSwitch = () => setTheme(previousState => !previousState) // Update theme state when switched;

    // Store new theme in asynstorage
    const storeTheme = async (value) => {
        try {
            await AsyncStorage.setItem('theme', value);
        } catch (e) {
            // saving error
            console.log(e);
        }
    };

    // Clear storage based on OS (asyncStorage.clear() gives error on iphone when already empty)
    const clearAsyncStorage = async() => {
        const AsyncStorageKeys = await AsyncStorage.getAllKeys();

        //When there's values stored clear data
        if(AsyncStorageKeys.length > 0){ 
            if(Platform.OS === 'android'){
                await AsyncStorage.clear();
                console.log("Data Cleared");
                // Update to default settings
                setResetData(true);
            }
            if(Platform.OS === 'ios'){
                await AsyncStorage.multiRemove(AsyncStorageKeys);
                console.log("Data Cleared");
                // Update to default settings
                setResetData(true);
            }
        }
    }
    
    // Store new theme state in asyncstorage when the value is changed 
    useEffect(() => {
        theme ? storeTheme("Dark") : storeTheme("Light");
    }, [theme]) //Trigger on theme value change

    return (
        <View style={styleTheme.container}>
            {/* Theme Setting */}
            <View style={styleTheme.settingContainer}>
                <IconTextSwitch
                    theme={theme}
                    icon='adjust'
                    text={`${theme ? 'Dark' : 'Light'} Theme`}
                    value={theme}
                    onValueChangeFunction={toggleSwitch}
                    
                />
            </View>
            {/* Clear aSyncStorage Setting */}
            <View style={styleTheme.settingContainer}>
                <ScreenWidthTextButton
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
      backgroundColor: '#f5f5f5',
      alignItems: 'center',
      justifyContent: 'top',
      paddingTop: 10
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
      backgroundColor: '#0d0d0d',
      alignItems: 'center',
      justifyContent: 'top',
      paddingTop: 10
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