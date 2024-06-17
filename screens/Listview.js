import { useEffect, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';



const Listview = ( { route, navigation } ) => {
    
    return (
        <View style={styles.container}>
            <FlatList
                data={route.params?.sights}
                renderItem={({item}) => 
                    <Pressable style={styles.navigationButtons} onPress={() => navigation.navigate('Map', {
                        latitude: item.coordinates.latitude,
                        longitude: item.coordinates.longitude,
                        // Zoom level on map
                        latitudeDelta: 0.001,
                        longitudeDelta: 0.001
                    })}>
                        <Text>{item.key}: {item.title}</Text>
                    </Pressable>
                }
            />
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
        width: '10px',
        height: '20px',
        borderColor: 'Black',
        borderWidth: '1px solid',
        padding: '30px',
        marginVertical: 5
    }
});
  
export default Listview;