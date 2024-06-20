import { StyleSheet, Switch, Text, View } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';

const IconTextSwitch = ({ theme, icon, text, value, onValueChangeFunction }) => {
    const styleTheme = theme ? stylesDark : stylesLight;

    return (
        <View style={styleTheme.container}>
            <View style={styleTheme.leftContainer}>
                <FontAwesome style={styleTheme.icon} name={icon} size={24} color="orange"/>
                <Text style={styleTheme.text}>{text}</Text>
            </View>
            <Switch
                style={styleTheme.switch}
                trackColor={{false: '#fff', true: 'orange'}}
                thumbColor='#fff'
                ios_backgroundColor="#fff"
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
        width: '100%',
        backgroundColor: '#fff',
        padding: 20,
        marginBottom: 5
    },
    leftContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'start'
    },
    icon: {
        paddingRight: 5
    },
    switch: {
        
    },
    text: {
        paddingRight: 5,
        fontWeight: 'bold',
        color: 'orange'
    }
});

const stylesDark = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        backgroundColor: '#171717',
        padding: 20,
        marginBottom: 5
    },
    leftContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'start'
    },
    icon: {
        paddingRight: 5
    },
    switch: {

    },
    text: {
        paddingRight: 5,
        fontWeight: 'bold',
        color: 'orange'
    }
});

export default IconTextSwitch;