import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';



const Listview = ( { navigation } ) => {
    const [sights, setSights] = useState([]);

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

    //Load in data each time you enter the map for updates
    useEffect(() => {
        getLocationData();
    }, [])
    
    return (
        <View style={styles.container}>
            <FlatList
                data={sights}
                renderItem={({item}) => 
                    <Pressable style={styles.navigationButtons} onPress={() => navigation.navigate('Map', {
                        latitude: item.coordinates.latitude,
                        longitude: item.coordinates.longitude
                    })}>
                        <Text>{item.key}: {item.title}</Text>
                    </Pressable>
                }
            />
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
    navigationButtons: {

    }
});
  
export default Listview;