import { Pressable, StyleSheet } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const FavoriteButton = ({ itemKey, resetData }) => {
    const [favorite, setFavorite] = useState(false);

    const storeFavorite = async (value) => { //Store favorite value based on unique item key
        try {
            await AsyncStorage.setItem(JSON.stringify(itemKey), JSON.stringify(value));
        } catch (e) {
            // saving error
            console.log(e);
        }
    };

    //Get favorite value from aSyncStorage based on unique item key
    const getFavorite = async () => { 
        try {
          const value = await AsyncStorage.getItem(JSON.stringify(itemKey));
          if (value !== null) {
            // Update favorite according to saved value
            setFavorite(JSON.parse(value));
          } else { 
            // If data is empty reset to default value
            setFavorite(false);
          }
        } catch (e) {
          // error reading value
          console.log(e);
        }
    };

    //Update favorite according to saved value, on startup
    useEffect(() => {
        getFavorite(); 
    }, [])

    // when data is reset, reset favorite value to default on update
    useEffect(() => {
        if(resetData === true){
            getFavorite();
        }
    }, [resetData]) //Trigger when AsyncStorage is cleared

    useEffect(() => {
        storeFavorite(favorite); //Store new changed value in asynstorage
    }, [favorite]) //Trigger whenever favorite's value is changed

    return (
        <Pressable 
            style={styles.button}
            onPress={ () => {
                setFavorite(previousState => !previousState) //Change value to true or false
            }}
        >
            <FontAwesome name={favorite ? "star" : "star-o"} size={24} color="orange"/>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
});

export default FavoriteButton;