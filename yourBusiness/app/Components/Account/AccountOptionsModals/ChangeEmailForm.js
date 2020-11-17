import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Input, Button, Icon } from "react-native-elements";
import * as firebase from "firebase";
import { validateEmail } from "../../../Utils/Validations";
import { reauthenticate } from "../../../Utils/api";

export default function ChangeEmailFormn(props) {

    const { email, setShowModal, toastRef, setReloadUserInfo } = props;
    const [newEmail, setNewEmail] = useState(null);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [showPass, setShowPass] = useState(false);
    const [password, setPassword] = useState("");

    const onSubmit = () => {
        setErrors({});
        if (newEmail === email && !newEmail) {
            setErrors({ email: "El email no puede ser igual al actual" });           
        } else if (!validateEmail(newEmail)) {
            console.log(newEmail)
            setErrors({ email: "El email es incorrecto" });
        } else if (!newEmail & email) {
            setErrors({ email: "El email no puede ser vacio" });
        } else if (!newEmail) {
            setErrors({ email: "El email no puede ser igual al actual" });                     
        } else if (!password) {
            setErrors({ password: "El password no puede estar vacio" });  
        } else {
            setIsLoading(true);
            console.log(newEmail)
            reauthenticate(password)
                .then(() => {
                firebase
                .auth()
                .currentUser
                .updateEmail(newEmail)
                .then(() => {
                    setIsLoading(false);
                    setReloadUserInfo(true);
                    toastRef.current.show("Email actualizado correctamente")
                    setShowModal(false);
                }).catch((erro) => {
                    console.log(erro)
                    setErrors({ email: "Error al actualizar el email" });
                    setIsLoading(false);
                })
            }).catch(() => {
                setIsLoading(false);
                setErrors({ password: "la contraseña no es correcta"})
            })
        }
    }

    const onChange = (e) => {
        setPassword(e.nativeEvent.text)
    }
    return (
        <View style={styles.view}>  
            <Input 
                placeholder="Email"
                containerStyle={styles.input}
                rightIcon={{
                    type: "material-community",
                    name: "at",
                    color: "#c2c2c2"
                }}
                defaultValue={email || ""}
                onChange={(e) => setNewEmail(e.nativeEvent.text)}
                errorMessage={errors.email}
            />

            <Input
                placeholder="Contraseña"
                containerStyle={styles.InputForm}
                password={true}
                secureTextEntry={!showPass}
                rightIcon={
                    <Icon
                        type="material-community"
                        name={showPass ? "eye-off-outline" : "eye-outline"}
                        iconStyle={styles.iconRight}
                        onPress={() => setShowPass(!showPass)}
                    />
                }
                onChange={e => onChange(e)}
                errorMessage={errors.password}
            />
            <Button 
                title="Cambiar email"
                containerStyle={styles.btnEmail}
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
    btnEmail: {
        marginTop: 20,
        width: "95%"
    },
    btn: {
        backgroundColor: "#00a680"
    }
});