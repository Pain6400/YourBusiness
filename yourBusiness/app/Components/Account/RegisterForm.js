import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import * as firebase from "firebase";
import { size, isEmpty } from "lodash";

import { validateEmail } from "../../Utils/Validations";
import Loading from "../../Components/Loading";

export default function RegisterForm(props){
    const [showPass, setShowPass] = useState(false);
    const [showRepitPass, setShowRepitPass] = useState(false);
    const [formData, setFormData] = useState(defaultFormValues());
    const { toastRef, navigation } = props;
    const [loading, setLoading] = useState(false);

    const SaveData = () => {
        if (isEmpty(formData.email) || isEmpty(formData.password) || isEmpty(formData.repeatPassword)) {
            toastRef.current.show("Todos los campos son obligatorios")
        } else if(!validateEmail(formData.email)){         
            toastRef.current.show("El email es invalido")
        }else if(formData.password !== formData.repeatPassword){         
            toastRef.current.show("Las contraseñas deben der iguales")
        }else if(size(formData.password) < 6){         
            toastRef.current.show("Las contraseñas debe ser mayor de 6 caracteres")
        } else {
            setLoading(true);
            firebase
                .auth()
                .createUserWithEmailAndPassword(formData.email, formData.password)
                .then(response => {
                    setLoading(false);
                    navigation.navigate("account")
                }).catch(() => {
                    setLoading(false);
                    toastRef.current.show("Email ya esta en uso")
                })
        }
    }

    const onChange = (e, type) => {
        setFormData({ ...formData, [type]: e.nativeEvent.text })
    }
    return (
        <View style={styles.formContainer}>
            <Input
                placeholder="Correo Electronico"
                containerStyle={styles.InputForm}
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
                onChange={e => onChange(e, "password")} 
            />
            <Input 
                placeholder="Repetir contraseña"
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
                onChange={e => onChange(e, "repeatPassword")} 
            />

            <Button 
                title="Registarse"
                containerStyle={styles.btnContainerRegistarse}
                buttonStyle={styles.btnRegistrarse}
                onPress={() => SaveData()}
            />

            <Loading isVisible={loading} text="Creano cuenta..." />
        </View>
    )
}

function defaultFormValues(){
    return {
        email: "",
        password: "",
        repeatPassword: ""
    }
}

const styles = StyleSheet.create({
    formContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30
    },
    InputForm: {
        width: "100%",
        marginTop: 20
    },
    btnContainerRegistarse:{
        marginTop: 20,
        width: "95%"
    },
    btnRegistrarse: {
        backgroundColor: "#00a680"
    },
    iconRight:{
        color: "#c1c1c1"
    }
});