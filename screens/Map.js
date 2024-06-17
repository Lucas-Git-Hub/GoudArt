import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View } from 'react-native';
import { useEffect, useState } from 'react';

const Map = ( { route, navigation, sights, theme } ) => {
    const [styleTheme, setStyleTheme] = useState(stylesLight)
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

    useEffect(() => {   
        // Update theme if needed
        if(theme === true)
        {
            setStyleTheme(stylesDark)
        } else {
            setStyleTheme(stylesLight)
        }
    }, [theme])

    return (
        <View style={styleTheme.container}>
            <MapView 
                style={styleTheme.map} 
                showsUserLocation={true}
                region={region}
                onRegionChangeComplete={(region) => setRegion(region)}
                showsCompass={true}
            >
                {/* Read sights array and place the markers on the map */}
                {sights.map((marker) => (
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

const stylesLight = StyleSheet.create({
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

const stylesDark = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#000',
      alignItems: 'center',
      justifyContent: 'center',
    },
    map: {
        width: '100%',
        height: '100%',
    },
});
  
export default Map;