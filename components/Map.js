import { StatusBar } from 'expo-status-bar';
import MapView from 'react-native-maps';
import { StyleSheet, Text, View } from 'react-native';

const Map = () => {
    return (
        <View style={styles.container}>
            <MapView style={styles.map}/>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    map: {
        width: '100%',
        height: '100%',
    },
});
  
export default Map;