import { Pressable, StyleSheet, Text } from "react-native";

const TextButton = ({ theme, text, onPressFunction }) => {
    const styleTheme = theme ? stylesDark : stylesLight;

    return (
        <Pressable 
            style={styleTheme.button}
            onPress={onPressFunction}
        >
            <Text style={styleTheme.text}>{text}</Text>
        </Pressable>
    )
}

const stylesLight = StyleSheet.create({
    button: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000',
        borderRadius: 100,
        backgroundColor: 'darkblue',
        padding: 20
    },
    text: {
        color: 'orange',
        fontWeight: 'bold'
    }
});

const stylesDark = StyleSheet.create({
    button: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
        backgroundColor: 'darkblue',
        padding: 20
    },
    text: {
        color: 'orange',
        fontWeight: 'bold'
    }
});

export default TextButton;