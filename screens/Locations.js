import { FlatList, StyleSheet, View } from 'react-native';
import LocationListItem from '../components/LocationListItem';

const Locations = ( { navigation, sights, theme, resetData } ) => {
    const styleTheme = theme ? stylesDark : stylesLight;

    return (
        <View style={styleTheme.container}>
            {/* List of each location */}
            <FlatList
                style={styleTheme.flatlistContainer}
                showsVerticalScrollIndicator={false}
                data={sights}
                renderItem={({item}) => 
                    // Render each location with their unique information
                    <LocationListItem
                        navigation={navigation}
                        item={item}
                        theme={theme}
                        resetData={resetData}
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
    },
    flatlistContainer: {
        padding: 10
    }
});

const stylesDark = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#0d0d0d',
      alignItems: 'center',
      justifyContent: 'center',
    },
    flatlistContainer: {
        padding: 10,
    }
});
  
export default Locations;