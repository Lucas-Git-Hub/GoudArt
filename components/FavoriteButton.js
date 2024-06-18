import { Pressable, StyleSheet } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useState } from "react";

const FavoriteButton = ({ favorite, theme }) => {
    const [favoriteItem, setFavoriteItem] = useState(false);

    return (
        <Pressable 
            style={styles.button}
            onPress={ () => {
                setFavoriteItem(previousState => !previousState)
            }}
        >
            <FontAwesome name={favoriteItem ? "star" : "star-o"} size={24} color={ theme ? 'white' : 'black'}/>
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