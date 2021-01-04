import React, { useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import { size, isEmpty } from "lodash";
import {Picker} from '@react-native-picker/picker';

import { validateEmail } from "../../Utils/Validations";
import Loading from "../../Components/Loading";
const widthScreen = Dimensions.get("window").width;

import { firebaseApp } from "../../Utils/firebase";
import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";

const db = firebase.firestore(firebaseApp); 

export default function RegisterForm(props){
    const [showPass, setShowPass] = useState(false);
    const [showRepitPass, setShowRepitPass] = useState(false);
    const [formData, setFormData] = useState(defaultFormValues());
    const { toastRef, navigation } = props;
    const [loading, setLoading] = useState(false);
    const [ userType, setUserType ] = useState(0);
    const [ userPhone, setUserPhone] = useState(null);
    const [userName, setUserName] = useState("");

    const SaveData = () => {
        if (
                isEmpty(formData.email) || 
                isEmpty(formData.password) || 
                isEmpty(formData.repeatPassword) ||
                userType === 0 ||
                isEmpty(userPhone) ||
                isEmpty(userName) 
            ) {
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
                    db.collection("User")
                        .doc(response.user.uid)
                        .set({
                            userName: userName,
                            userPhone: userPhone,
                            userType: userType
                        }).then(res => {
                            setLoading(false);
                            navigation.navigate("account")
                        })
                        .catch(() => {
                            setLoading(false);
                            toastRef.current.show("Error")
                        });
                }).catch(() => {
                    setLoading(false);
                    toastRef.current.show("Email ya esta en uso")
                })

            //db.collection
        }
    }

    const onChange = (e, type) => {
        setFormData({ ...formData, [type]: e.nativeEvent.text })
    }
    return (
        <View style={styles.formContainer}>

            <Input
                placeholder="Nombre"
                containerStyle={styles.InputForm}
                rightIcon={
                    <Icon
                        type="material-community"
                        name="account-alert-outline"
                        iconStyle={styles.iconRight}
                    />
                }
                onChange={e => setUserName(e.nativeEvent.text)}
            />

            <Input
                placeholder="Telefono"
                containerStyle={styles.InputForm}
                keyboardType="numeric"
                rightIcon={
                    <Icon
                        type="material-community"
                        name="cellphone"
                        iconStyle={styles.iconRight}
                    />
                }
                onChange={e => setUserPhone(e.nativeEvent.text)}
            />

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

            <Picker
                selectedValue={userType}
                style={{ height: 50, width: "100%", marginTop: 20 }}
                onValueChange={(itemValue, itemIndex) => setUserType(itemValue)}
            >
                <Picker.Item label="--- Selecione el tipo de usuaio" value={0} />
                <Picker.Item label="Comun" value={1} />
                <Picker.Item label="Empresa" value={2} />
            </Picker>
      

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
        repeatPassword: "",
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