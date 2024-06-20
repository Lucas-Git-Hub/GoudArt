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
        borderWidth: '1px solid',
        borderRadius: '5px',
        borderColor: '#000',
    },
    text: {
        color: '#fff'
    }
});

const stylesDark = StyleSheet.create({
    button: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderWidth: '1px solid',
        borderRadius: '5px',
        borderColor: '#000',
    },
    text: {
        color: '#000'
    }
});

export default TextButton;