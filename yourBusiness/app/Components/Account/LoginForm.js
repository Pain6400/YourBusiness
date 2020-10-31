import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import { size, isEmpty } from "lodash";
import * as firebase from "firebase";

import { validateEmail } from "../../Utils/Validations";
import Loading from "../../Components/Loading";

export default function LoginForm(props){
    
    const { toastRef, navigation } = props;
    const [loading, setLoading] = useState(false);
    const [showPass, setShowPass] = useState(false);
    const [formData, setFormData] = useState(defaultFormValues());

    const onChange = (e, type) => {
        setFormData({ ...formData, [type]: e.nativeEvent.text })
    }

    const LoginSubmit = () => {
        if(isEmpty(formData.email) || isEmpty(formData.password)){
            toastRef.current.show("Todos los campos son requeridos")
        } else if (!validateEmail(formData.email)) {
            toastRef.current.show("El email no es valido");
        } else {
            setLoading(true);
            firebase
                .auth()
                .signInWithEmailAndPassword(formData.email, formData.password)
                .then(response => {
                    setLoading(false);
                    navigation.navigate("account")
                }).catch(err => {
                    setLoading(false);
                    toastRef.current.show("El email o contraseña incorrecta");
                })
        }
    }

    return (
        <View style={styles.formContainer}>
            <Input 
                placeholder="Correo electronico"
                containerStyle={styles.containerInput}
                rightIcon={
                    <Icon 
                        type="material-community"
                        name="at"
                        iconStyle={styles.iconRight}
                    />
                }
                onChange={e => onChange(e, "email")} 
            />
            <Input 
                placeholder="Contraseña"
                containerStyle={styles.containerInput}
                secureTextEntry={!showPass}
                rightIcon={
                    <Icon 
                        type="material-community"
                        name= {showPass ? "eye-off-outline" : "eye-outline"}
                        iconStyle={styles.iconRight}
                        onPress={() => setShowPass(!showPass)}
                    />
                }
                onChange={e => onChange(e, "password")} 
            />

            <Button 
                title="Iniciar sesión"
                containerStyle={styles.btnContainerLogin}
                buttonStyle={styles.btnLogin}
                onPress={() => LoginSubmit()}
            />
            <Loading isVisible={loading} text="Iniciando sesion..." />
        </View>
    );
}

function defaultFormValues(){
    return {
        email: "",
        password: "",
    }
}

const styles = StyleSheet.create({
    formContainer:{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30
    },
    containerInput:{
        width: "100%",
        margin: 20
    },
    btnContainerLogin:{
        marginTop: 20,
        width: "95%"
    },
    btnLogin:{
        backgroundColor: "#00a680"
    },
    iconRight:{
        color: "#c1c1c1"
    }
});