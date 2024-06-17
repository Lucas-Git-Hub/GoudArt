import { StatusBar } from 'expo-status-bar';
import MapView, { Marker } from 'react-native-maps';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';

const Map = ( { route, navigation } ) => {
    const [sights, setSights] = useState([]);
    const [region, setRegion] = useState({
        latitude: 52,
        longitude: 4.7,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1
    });

    // Get data
    async function getLocationData(){
        try {
        await fetch("https://lucas-git-hub.github.io/jsonFetch/gouda-sights.json", {
            method: 'GET',
            headers: {Accept: 'application/json'}
        })
        .then(res => res.json())
            .then(data => {
                setSights(data);
                console.log(data)
            })
    
        } catch (error) {
            console.log(error);
        }
    }

    //Load in data each time you enter the map for updates
    useEffect(() => {
        getLocationData();
    }, [])

    useEffect(() => {
        //When coordinates are given with route change current region
        if(route.params?.latitude && route.params?.longitude)
            {
                setRegion(route.params)
                console.log("Region: "+ JSON.stringify(region)) //Bug with starterdata > delta values
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
                {sights.map((marker) => (
                    <Marker
                        key={marker.key}
                        coordinate={marker.coordinates}
                        title={marker.title}
                        description={marker.description}
                    />
                ))}
            </MapView>
            <Pressable style={styles.navigationButtons} onPress={() => navigation.navigate('Locations')}>
                <Text>Locations</Text>
            </Pressable>
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
        height: '90%',
    },
    navigationButtons: { //To do navigationbar and buttons at the bottom of screen
        
    },
});
  
export default Map;