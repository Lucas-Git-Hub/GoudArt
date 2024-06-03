import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

const Listview = () => {
    const [sights, setSights] = useState([
        {
            key: 0,
            title: "Ape",
        },
        {
            key: 1,
            title: "Ape2",
        }
    ]);
    
    return (
        <View style={styles.container}>
            <FlatList
                data={sights}
                renderItem={({item}) => <Text>{item.key}: {item.title} </Text>}
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
});
  
export default Listview;