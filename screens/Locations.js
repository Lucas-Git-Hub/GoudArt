import { FlatList, StyleSheet, View } from 'react-native';
import LocationListItem from '../components/LocationListItem';

const Locations = ( { navigation, sights, theme } ) => {
    const styleTheme = theme ? stylesDark : stylesLight;

    return (
        <View style={styleTheme.container}>
            <FlatList
                data={sights}
                renderItem={({item}) => 
                    <LocationListItem
                        navigation={navigation}
                        item={item}
                        theme={theme}
                    />
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
});

const stylesDark = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#000',
      alignItems: 'center',
      justifyContent: 'center',
    },
});
  
export default Locations;