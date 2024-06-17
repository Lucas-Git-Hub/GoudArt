import { useEffect, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

const Listview = ( { route, navigation, sights, theme } ) => {
    const styleTheme = theme ? stylesDark : stylesLight;

    return (
        <View style={styleTheme.container}>
            <FlatList
                data={sights}
                renderItem={({item}) => 
                    <Pressable style={styleTheme.navigationButtons} onPress={() => navigation.navigate('Map', {
                        latitude: item.coordinates.latitude,
                        longitude: item.coordinates.longitude,
                        // Zoom level on map
                        latitudeDelta: 0.001,
                        longitudeDelta: 0.001
                    })}>
                        <Text style={styleTheme.text}>{item.key}: {item.title}</Text>
                    </Pressable>
                }
            />
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
    navigationButtons: {
        width: '10px',
        height: '20px',
        borderColor: '#000',
        borderWidth: '1px solid',
        padding: '30px',
        marginVertical: 5,
        color: '#000'
    },
    text: {
        color: '#000'
    }
});

const stylesDark = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#000',
      alignItems: 'center',
      justifyContent: 'center',
    },
    navigationButtons: {
        width: '10px',
        height: '20px',
        borderColor: '#fff',
        borderWidth: '1px solid',
        padding: '30px',
        marginVertical: 5,
    },
    text: {
        color: '#fff'
    }
});
  
export default Listview;