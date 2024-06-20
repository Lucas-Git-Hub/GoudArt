import { StyleSheet, Text, View } from "react-native";
import GoToLocationButton from "./GoToLocationButton";
import FavoriteButton from "./FavoriteButton";

const LocationListItem = ({ navigation, item, theme }) => {
    const styleTheme = theme ? stylesDark : stylesLight;

    return (
        <View style={styleTheme.container}>
            <Text style={styleTheme.text}>{item.title}</Text>
            <View style={styleTheme.buttonsContainer}>
                <View style={styleTheme.buttonsContainer.buttonContainer}>
                    <GoToLocationButton 
                        navigation={navigation}
                        coordinates={item.coordinates}
                    />
                </View>
                <View style={styleTheme.buttonsContainer.buttonContainer}>
                    <FavoriteButton
                        theme={theme}
                        itemKey={item.key}
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
        borderBottomWidth: 5,
        borderColor: '#000',
      },
      text: {
        flex: 0.6,
        paddingLeft: 5,
      },
      buttonsContainer: {
        flex: 0.4,
        flexDirection: 'row',
        flexWrap: 'nowrap',
        alignContent: 'center',
        alignItems: 'center',

        buttonContainer: {
            flex: 1,
            borderLeftWidth: 5,
            padding: 5,
        },
    }
});

const stylesDark = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      width: '100%',
      backgroundColor: '#000',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottomWidth: 5,
      borderColor: '#fff',
    },
    text: {
        flex: 0.6,
        paddingLeft: 5,
        color: '#fff'
    },
    buttonsContainer: {
        flex: 0.4,
        flexDirection: 'row',
        flexWrap: 'nowrap',
        alignContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',

        buttonContainer: {
            flex: 1,
            borderLeftWidth: 5,
            padding: 5,
            borderLeftColor: '#fff'
        },
    }
});

export default LocationListItem;