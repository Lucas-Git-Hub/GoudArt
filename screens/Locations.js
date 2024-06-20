import { FlatList, StyleSheet, View } from 'react-native';
import LocationListItem from '../components/LocationListItem';

const Locations = ( { navigation, sights, theme } ) => {
    const styleTheme = theme ? stylesDark : stylesLight;

    return (
        <View style={styleTheme.container}>
            <FlatList
                showsVerticalScrollIndicator={false}
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
      backgroundColor: '#f5f5f5',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 10,
      paddingBottom: 0
    },
});

const stylesDark = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#0d0d0d',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20
    },
});
  
export default Locations;