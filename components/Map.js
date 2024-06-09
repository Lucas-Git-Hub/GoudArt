import { StatusBar } from 'expo-status-bar';
import MapView, { Marker } from 'react-native-maps';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';

const Map = ( { route, navigation } ) => {
    const [sights, setSights] = useState([]);
    const [test, setTests] = useState([
        { 
            key: 0,
            title: "Test",
            coordinate: {
                latitude: 52.01353536518806, 
                longitude: 4.707544400000001
            },
            description: "Testing"
        }
    ])
    const [region, setRegion] = useState();

    // Get data
    async function getLocationData(){
        try {
        fetch("https://stud.hosted.hr.nl/0993934/prg07/gouda-sights.json", {
            method: 'GET',
            headers: {Accept: 'application/json'}
        })
        .then(res => res.json())
            .then(data => {
                setSights(data);
                console.log("Succes")
            })
    
        } catch (error) {
            console.log(error);
        }
    }

    // onRegionChange(region)
    // {
    //     setRegion({region});
    // }

    //Load in data each time you enter the map for updates
    useEffect(() => {
        getLocationData();
    }, [])

    // useEffect(() => {
    //     console.log("params: "+ JSON.stringify(route.params))
    //     //When coordinates are given with route change current region
    //     if(route.params?.latitude && route.params?.longitude)
    //         {
    //             setRegion(route.params)
    //             console.log("Region: "+ JSON.stringify(region))
    //         }
    // }, [route.params])

    return (
        <View style={styles.container}>
            <MapView 
                style={styles.map} 
                showsUserLocation={true}
                // region ={{
                //     latitude: 52,
                //     longitude: 4,
                //     latitudeDelta: 0.0,
                //     longitudeDelta: 0.0
                // }}
                // onRegionChange={onRegionChange}
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