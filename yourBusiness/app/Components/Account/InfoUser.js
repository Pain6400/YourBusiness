import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Avatar, Accessory } from "react-native-elements";
import * as firebase from "firebase";
import * as Permissions from "expo-permissions"
import * as ImagePicker from "expo-image-picker"

export default function InfoUser(props){
    const { 
        userInfo : 
            { 
                email, 
                photoURL, 
                displayName,
                uid
            },
        toastRef,
        setLoading,
        setLoadingText
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

            if(result.cancelled) {
                toastRef.current.show("Has cerrado la selecion de imagenes");
            } else {
                uploadImage(result.uri).then(() => {
                    updatePhotoUrl();
                }).catch(() => {
                    toastRef.current.show("Error al actualizar el avatar");
                })
            }
        }
    }

    const uploadImage = async (uri) => {
        setLoadingText("Actualizando avatar");
        setLoading(true);
        const response = await fetch(uri);
        const blob = await response.blob();
        const mountainsRef = await firebase.storage().ref().child(`avatar/image${uid}`);
        return mountainsRef.put(blob);
    }

    const updatePhotoUrl = () => {
        firebase
            .storage()
            .ref(`avatar/image${uid}`)
            .getDownloadURL()
            .then(async (response) => {
                const update = {
                    photoURL: response
                }

                await firebase.auth().currentUser.updateProfile(update);
                setLoading(false);
            })
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