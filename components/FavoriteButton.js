import { Pressable, StyleSheet } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const FavoriteButton = ({ itemKey, theme }) => {
    const [favorite, setFavorite] = useState(false);

    const storeFavorite = async (value) => { //Store favorite based on unique item key
        try {
            await AsyncStorage.setItem(JSON.stringify(itemKey), JSON.stringify(value));
        } catch (e) {
            // saving error
            console.log(e);
        }
    };

    const getFavorite = async () => { //Get favorite based on unique item key
        try {
          const value = await AsyncStorage.getItem(JSON.stringify(itemKey));
          if (value !== null) {
            // Update favorite according to saved value
            setFavorite(JSON.parse(value))
          }
        } catch (e) {
          // error reading value
          console.log(e)
        }
      };

    useEffect(() => {
        getFavorite(); //Update favorite according to saved value, when first loaded
    }, [])

    useEffect(() => {
        storeFavorite(favorite); //Store new changed value in asynstorage
    }, [favorite]) //Activate whenever favorite's value is changed

    return (
        <Pressable 
            style={styles.button}
            onPress={ () => {
                setFavorite(previousState => !previousState) //Change value to true or false
            }}
        >
            <FontAwesome name={favorite ? "star" : "star-o"} size={24} color={ theme ? 'white' : 'black'}/>
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