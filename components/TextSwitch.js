import { StyleSheet, Switch, Text, View } from "react-native";

const TextSwitch = ({ theme, text, value, onValueChangeFunction }) => {
    const styleTheme = theme ? stylesDark : stylesLight;

    return (
        <View style={styleTheme.container}>
            <Text style={styleTheme.text}>{text}</Text>
            <Switch
                style={styleTheme.switch}
                trackColor={{false: 'darkblue', true: 'darkblue'}}
                thumbColor={theme ? 'orange' : 'orange'}
                ios_backgroundColor="darkblue"
                onValueChange={onValueChangeFunction}
                value={value}
            />
        </View>
    )
}

const stylesLight = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    switch: {
        
    },
    text: {
        paddingRight: 5,
        fontWeight: 'bold',
        color: '#000'
    }
});

const stylesDark = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    switch: {

    },
    text: {
        paddingRight: 5,
        fontWeight: 'bold',
        color: '#fff'
    }
});

export default TextSwitch;