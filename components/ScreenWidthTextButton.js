import { Pressable, StyleSheet, Text } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';

const ScreenWidthTextButton = ({ theme, text, onPressFunction }) => {
    const styleTheme = theme ? stylesDark : stylesLight;

    return (
        <Pressable 
            style={({pressed}) => [
                //Display different backgroundcolor when pressed depending on current theme
                theme ? { backgroundColor: pressed ? "#303030" : "#171717"} : { backgroundColor: pressed ? "#e6e6e6" : "#fff"},
                styleTheme.button
            ]}
            onPress={() => {
                onPressFunction()
            }}
        >
            <FontAwesome style={styleTheme.icon} name='refresh' size={24} color="orange"/>
            <Text style={styleTheme.text}>{text}</Text>
        </Pressable>
    )
}

const stylesLight = StyleSheet.create({
    button: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'start',
        padding: 20,
        marginBottom: 5,
    },
    text: {
        flex: 1,
        color: 'orange',
        fontWeight: 'bold'
    },
    icon: {
        paddingRight: 5
    },
});

const stylesDark = StyleSheet.create({
    button: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'start',
        padding: 20,
        marginBottom: 5,
    },
    text: {
        flex: 1,
        color: 'orange',
        fontWeight: 'bold'
    },
    icon: {
        paddingRight: 5
    },
});

export default ScreenWidthTextButton;