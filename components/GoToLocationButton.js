import { Pressable, StyleSheet } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';

const GoToLocationButton = ({ navigation, coordinates }) => {

    return (
        <Pressable 
            style={styles.button}
            onPress={() => navigation.navigate('Map', { //Navigate to marker on map
                latitude: coordinates.latitude,
                longitude: coordinates.longitude,
                // Zoom level on map
                latitudeDelta: 0.001,
                longitudeDelta: 0.001
        })}>
            <FontAwesome name='map-marker' size={24} color='red'/>
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

export default GoToLocationButton;