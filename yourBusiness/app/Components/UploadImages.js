import React from "react";
import { StyleSheet, View, Alert } from "react-native";
import { Icon, Avatar } from "react-native-elements";
import * as Permissions from "expo-permissions";
import * as ImagesPicker from "expo-image-picker";
import { map, size, filter } from "lodash"

export default function UploadImage(props) {

    const { toastRef, imagesSelected, setImageSelected } = props;
    const imageSelect = async () => {
        const resultPermissions = await Permissions.askAsync(
            Permissions.CAMERA_ROLL
        )

        if(resultPermissions === "denied") {
            toastRef.current.show("Para acceder a la galeria debe de aceptar los permisos", 3000)
        } else {
            const result = await ImagesPicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [4,4]
            });

            if(result.cancelled) {
                toastRef.current.show(
                    "Debe de seleccionar al menos una imagen",
                    3000
                );

            } else {
                setImageSelected([...imagesSelected, result.uri])
            }
        }
    }

    const removeImage = (image) => {
        Alert.alert(
            "Eliminar imagen",
            "¿Deseas eliminar la imagen?",
            [
                {
                    text: "cancel",
                    style: "cancel"
                },
                {
                    text: "Eliminar",
                    onPress: () => {
                       const images = filter(imagesSelected, (imageUrl) => imageUrl !== image );
                       setImageSelected(images);
                    }
                }
            ],
            { cancelable: false}
        )
    }

    return (
        <View style={styles.viewImage}>
            {size(imagesSelected) < 5 && (
                <Icon
                    type="material-community"
                    name="camera"
                    color="#7a7a7a"
                    containerStyle={styles.icon}
                    onPress={imageSelect}
                />
            )}

            {map(imagesSelected, (image, index) => (
                <Avatar 
                    key={index}
                    style={styles.avatar}
                    source={{ uri : image}}
                    onPress={() => removeImage(image)}
                />
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    viewImage: {
        flexDirection: "row",
        marginLeft: 20,
        marginTop: 20,
        marginRight: 30
    },
    icon: {
        alignItems: "center",
        justifyContent: "center",
        marginRight: 10,
        height: 70,
        width: 70,
        backgroundColor: "#e3e3e3"
    },
    avatar: {
        width: 70,
        height: 70,
        marginRight: 5
    }
})