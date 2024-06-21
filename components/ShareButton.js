import { Alert, Pressable, Share, StyleSheet } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';

const ShareButton = ({ message }) => {

    // Open share menu and handle share information
    const shareInfo = async () => {
        try {
            const result = await Share.share({
                message: message, 
            })
            if(result.action === Share.sharedAction){
                if(result.activityType){ //Type can be used depending on what platform they share it on
                    console.log("Shared with activity type")
                } else { //General share
                    console.log("Shared")
                }
            } else if(result.action === Share.dismissedAction){
                //When share menu is closed/cancelled
                console.log("Dismissed share")
            }
        } catch (error) {
            Alert.alert(error.message);
        }
    };
    
    return (
        <Pressable 
            style={styles.button}
            onPress={shareInfo}>
            <FontAwesome name='share-alt' size={24} color='orange'/>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
});

export default ShareButton;