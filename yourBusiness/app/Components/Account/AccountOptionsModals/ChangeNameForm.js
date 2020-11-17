import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Input, Button } from "react-native-elements";
import * as firebase from "firebase";
export default function ChangeNameForm(props) {
    const { name, setShowModal, toastRef, setReloadUserInfo } = props;
    const [newName, setNewName] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = () => {
        setError(null);
    
        if (newName === name && !newName) {
            setError("El nombre no puede ser igual al actual");           
        } else if (!newName & name) {
            setError("El nombre no puede ser vacio");
        } else if (!newName) {
            setError("El nombre no puede ser igual al actual");                     
        } 
        else {
            setIsLoading(true);
            const update = {
                displayName: newName
            }
            firebase
                .auth()
                .currentUser
                .updateProfile(update)
                .then(() => {
                    setIsLoading(false);
                    setReloadUserInfo(true);
                    toastRef.current.show("Nombre actualizado correctamente")
                    setShowModal(false);
                }).catch((erro) => {
                    setIsLoading(false);
                    setError("Error al actualizar el nombre");
                })
        }
    }

    return (
        <View style={styles.view}>  
            <Input 
                placeholder="Nombre y apellido"
                containerStyle={styles.input}
                rightIcon={{
                    type: "material-community",
                    name: "account-circle-outline",
                    color: "#c2c2c2"
                }}
                defaultValue={name || ""}
                onChange={(e) => setNewName(e.nativeEvent.text)}
                errorMessage={error}
            />
            <Button 
                title="Cambiar nombre"
                containerStyle={styles.btnName}
                buttonStyle={styles.btn}
                onPress={() => onSubmit()}
                loading={isLoading}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        alignItems: "center",
        paddingTop: 10,
        paddingBottom: 10
    },
    input: {
        marginBottom: 10
    },
    btnName: {
        marginTop: 20,
        width: "95%"
    },
    btn: {
        backgroundColor: "#00a680"
    }
});