import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Avatar, Accessory, Image } from "react-native-elements";
import * as firebase from "firebase";
import * as Permissions from "expo-permissions"
import * as ImagePicker from "expo-image-picker"

export default function InfoUser(props){
    const { 
        userInfo : 
            { 
                email, 
                photoURL, 
                displayName
            },
        toastRef
        } = props;

    const changeAvatar = async () => {
        const resultPermissions = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        const resultPermissionsCamera = resultPermissions.permissions.cameraRoll.status;
        if (resultPermissionsCamera === "denied") {
            toastRef.current.show("Es obligatorio aceptar los permisos para acceder a la galeria");
        } else {
            const result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [4,3],
            })

            console.log(result)
        }
    }

    return (
        <View style={styles.viewUserInfo}>
            <Avatar 
                rounded
                size="large"
                containerStyle={styles.userInfoAvatar}
                source={
                    photoURL ? { uri: photoURL } : require("../../../assets/Images/avatar-default.jpg") 
                }           
            >
                <Accessory size={33} onPress={changeAvatar} />  
            </Avatar>
            <View>
                <Text style={styles.displayName}>{displayName ? displayName : "Anonimo"}</Text>
                <Text style={styles.displayName}>{email ? email : "Social Login"}</Text>
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    viewUserInfo: {
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        backgroundColor: "#f2f2f2",
        paddingTop: 30,
        paddingBottom: 30
    },
    userInfoAvatar: {
        marginRight: 20
    },
    displayName:{
        fontWeight: "bold",
        paddingBottom: 5
    }
});