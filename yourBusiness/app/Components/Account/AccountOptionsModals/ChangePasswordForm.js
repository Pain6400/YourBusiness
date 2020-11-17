import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Input, Button, Icon } from "react-native-elements";
import { size, isEmpty } from "lodash";
import * as firebase from "firebase";
import { reauthenticate } from "../../../Utils/api";

export default function ChangePasswordForm(props) {
    const { setShowModal, toastRef, setReloadUserInfo } = props;
    const [showPass, setShowPass] = useState(false);
    const [showNewPass, setShowNewPass] = useState(false);
    const [showRepitPass, setShowRepitPass] = useState(false);
    const [password, setPassword] = useState(null);
    const [newPassword, setNewPassword] = useState(null);
    const [repeatPassword, setRepeatPassword] = useState(null);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = () => {
        setErrors({});
    
        if (!password) {
            setErrors({ errorPass: "La contraseña no puede ser vacia" });           
        } else if (!newPassword) {
            setErrors({ errorNewPass: "La contraseña no puede ser vacia" });           
        } else if (!repeatPassword) {
            setErrors({ errorRepeatPass: "La contraseña no puede ser vacia" });           
        } else if (newPassword !== repeatPassword) {
            setErrors({ errorRepeatPass : "Las contraseñas deben ser iguales" }); 
        } else if(size(newpassword) < 6){   
            setErrors({ errorNewPass : "Las contraseñas debe ser mayor de 6 caracteres" })
        }
        else {            
            setIsLoading(true);

            reauthenticate(password).then(() => {
                firebase
                .auth()
                .currentUser
                .updatePassword(newPassword)
                .then(() => {
                    setIsLoading(false);
                    setReloadUserInfo(true);
                    toastRef.current.show("Contraseñá actualizado correctamente")
                    setShowModal(false);
                }).catch((erro) => {
                    setIsLoading(false);
                    setErrors({ errorNewPass: "Error al actualizar la contraseña" });
                })
            }).catch(() => {
                setIsLoading(false);
                setErrors({ password : "La contraseña es incorrecta" });
            })
        }
    }

    return (
        <View style={styles.view}>  
            <Input 
                placeholder="Contraseña actual"
                containerStyle={styles.InputForm}
                password={true}
                secureTextEntry={!showPass}
                rightIcon={
                    <Icon 
                        type="material-community"
                        name= {showPass ? "eye-off-outline" : "eye-outline"}
                        iconStyle={styles.iconRight}
                        onPress={() => setShowPass(!showPass)}
                    />
                }
                onChange={(e) => setPassword(e.nativeEvent.text)}
                errorMessage={errors.errorPass}
            />
            <Input 
                placeholder="Nueva contraseña"
                containerStyle={styles.InputForm}
                password={true}
                secureTextEntry={!showRepitPass}
                rightIcon={
                    <Icon 
                        type="material-community"
                        name= {showNewPass ? "eye-off-outline" : "eye-outline"}
                        iconStyle={styles.iconRight}
                        onPress={() => setShowPass(!showNewPass)}
                    />
                }
                onChange={e => setNewPassword(e.nativeEvent.text)} 
                errorMessage={errors.errorNewPass}
            />
            <Input 
                placeholder="Repetir Nueva contraseña"
                containerStyle={styles.InputForm}
                password={true}
                secureTextEntry={!showRepitPass}
                rightIcon={
                    <Icon 
                        type="material-community"
                        name= {showRepitPass ? "eye-off-outline" : "eye-outline"}
                        iconStyle={styles.iconRight}
                        onPress={() => setShowRepitPass(!showRepitPass)}
                    />
                }
                onChange={e => setRepeatPassword(e.nativeEvent.text)} 
                errorMessage={errors.errorRepeatPass}
            />
            <Button 
                title="Cambiar contraseña"
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