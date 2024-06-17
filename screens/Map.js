import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View } from 'react-native';
import { useEffect, useState } from 'react';

const Map = ( { route, navigation } ) => {
    const [region, setRegion] = useState({
        latitude: 52,
        longitude: 4.7,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1
    });

    useEffect(() => {
        //When coordinates are given with route, change current region
        if(route.params?.latitude && route.params?.longitude)
            {
                setRegion(route.params)
            }
    }, [route.params])

    return (
        <View style={styles.container}>
            <MapView 
                style={styles.map} 
                showsUserLocation={true}
                region={region}
                onRegionChangeComplete={(region) => setRegion(region)}
                showsCompass={true}
            >
                {/* Read sights array and place the markers on the map */}
                {route.params?.sights.map((marker) => (
                    <Marker
                        key={marker.key}
                        coordinate={marker.coordinates}
                        title={marker.title}
                        description={marker.description}
                    />
                ))}
            </MapView>
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