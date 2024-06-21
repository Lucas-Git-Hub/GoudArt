import { StyleSheet, Text, View } from "react-native";
import GoToLocationButton from "./GoToLocationButton";
import FavoriteButton from "./FavoriteButton";
import ShareButton from "./ShareButton";

const LocationListItem = ({ navigation, item, theme, resetData }) => {
    const styleTheme = theme ? stylesDark : stylesLight;

    return (
        <View style={styleTheme.container}>
            <View style={styleTheme.textContainer}>
                <Text style={styleTheme.title}>{item.title}</Text>
                <Text style={styleTheme.description}>{item.description}</Text>
            </View>
            <View style={styleTheme.buttonsContainer}>
                <View style={styleTheme.buttonsContainer.buttonContainer}>
                    <GoToLocationButton 
                        navigation={navigation}
                        coordinates={item.coordinates}
                    />
                </View>
                <View style={styleTheme.buttonsContainer.buttonContainer}>
                    <ShareButton
                        message={`Bekijk deze locatie in Gouda: ${item.title}\nhttps://www.google.com/maps/place/${item.coordinates.latitude},${item.coordinates.longitude}`} //Share a link of the location to google maps
                    />
                </View>
                <View style={styleTheme.buttonsContainer.buttonContainer}>
                    <FavoriteButton
                        itemKey={item.key}
                        resetData={resetData}
                    />
                </View>
            </View>
        </View>
    )
}

const stylesLight = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        width: '100%',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20,
        borderRadius: 25,
        marginBottom: 10
      },
      textContainer: {
        flex: 0.7,
        padding: 5,
        flexDirection: 'column',
        justifyContent: 'center'
      },
      title: {
        flex: 1,
        fontWeight: 'bold',
        color: 'orange',
        fontSize: 16,
        paddingBottom: 2
      },
      description: {
        flex: 1,
        fontSize: 12,
      },
      buttonsContainer: {
        flex: 0.35,
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',

        buttonContainer: {
            flex: 1,
            padding: 5,
        },
    }
});

const stylesDark = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        width: '100%',
        backgroundColor: '#171717',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20,
        borderRadius: 25,
        marginBottom: 10
    },
    textContainer: {
        flex: 0.7,
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 5  
    },
    title: {
        flex: 1,
        fontWeight: 'bold',
        color: 'orange',
        fontSize: 16,
        paddingBottom: 2
    },
    description: {
        flex: 1,
        fontSize: 12,
        color: '#fff'
    },
    buttonsContainer: {
        flex: 0.35,
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',

        buttonContainer: {
            flex: 1,
            padding: 5,
        },
    }
});

export default LocationListItem;