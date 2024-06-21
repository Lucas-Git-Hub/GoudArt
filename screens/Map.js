import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View } from 'react-native';
import { useEffect, useState } from 'react';
import MapDark from '../map_styles/map-dark';

const Map = ( { route, sights, theme } ) => {
    // Set theme for map and other elements based on theme
    const styleTheme = theme ? stylesDark : stylesLight; 
    const mapStyle = theme ? MapDark : [];

    const [region, setRegion] = useState({
        // Starter region is in the middle of Gouda
        latitude: 52.01990,
        longitude: 4.70973,
        latitudeDelta: 0.06,
        longitudeDelta: 0.06
    });

    useEffect(() => {
        //When coordinates are given with route, change current region
        if(route.params?.latitude && route.params?.longitude)
        {
            setRegion(route.params)
        }
    }, [route.params]) //Trigger when route.params has a value

    return (
        <View style={styleTheme.container}>
            <MapView 
                style={styleTheme.map} 
                showsUserLocation={true}
                region={region}
                onRegionChangeComplete={(region) => setRegion(region)}
                showsCompass={true}
                customMapStyle={mapStyle} // Only works for android
            >
                {/* Read sights (locations) array and place the markers on the map */}
                {sights.map((marker) => (
                    <Marker
                        key={marker.key}
                        coordinate={marker.coordinates}
                        title={marker.title}
                        description={marker.description}
                        pinColor='orange'
                    />
                ))}
            </MapView>
        </View>
    );
}

const stylesLight = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f5f5f5',
      alignItems: 'center',
      justifyContent: 'center',
    },
    map: {
        width: '100%',
        height: '100%',
    },
});

const stylesDark = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#0d0d0d',
      alignItems: 'center',
      justifyContent: 'center',
    },
    map: {
        width: '100%',
        height: '100%',
    },
});
  
export default Map;