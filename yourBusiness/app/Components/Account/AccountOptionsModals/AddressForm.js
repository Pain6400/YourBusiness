import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Input, Button, Icon } from "react-native-elements";

import { firebaseApp } from "../../../Utils/firebase";
import firebase from "firebase/app";
import "firebase/firestore";

const db = firebase.firestore(firebaseApp); 

export default function AddressForm(props)
{
    const { setShowModal, toastRef } = props;
    const [nombreDireccion, setNombreDireccion] = useState("");
    const [quienRecibe, setQuienRecibe] = useState("");
    const [telefono, setTelefono] = useState("");
    const [colonia, setColonia] = useState("");
    const [rtn, setRtn] = useState("");
    const [direccionDetalle, setDireccionDetalle] = useState("");
    const [puntoreFerencia, setPuntoReferencia] = useState("");
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        db.collection("Address")
        .doc(firebase.auth().currentUser.uid)
        .get()
        .then((response) => {
            const data = response.data();
            
            if(data) {
                setNombreDireccion(data.nombreDireccion);
                setQuienRecibe(data.quienRecibe);
                setTelefono(data.telefono);
                setColonia(data.colonia);
                setRtn(data.rtn);
                setDireccionDetalle(data.direccionDetalle);
                setPuntoReferencia(data.puntoreFerencia);
            }
        }).catch((error) => {
            console.log(error)
        })
    }, [])

    const onSubmit = () =>
    {
        setErrors({});
        if(!nombreDireccion)
        {
            setErrors({ nombreDireccion: "El campo es requerido"});
        } else if(!quienRecibe)
        {
            setErrors({ quienRecibe: "El campo es requerido"});
        } else if(!telefono)
        {
            setErrors({ telefono: "El campo es requerido"});
        } else if(!colonia)
        {
            setErrors({ colonia: "El campo es requerido"});
        } else if(!direccionDetalle)
        {
            setErrors({ direccionDetalle: "El campo es requerido"});
        } else {
            setIsLoading(true);
            db.collection("Address")
                .doc(firebase.auth().currentUser.uid)
                .set({
                    nombreDireccion: nombreDireccion,
                    quienRecibe: quienRecibe,
                    telefono: telefono,
                    colonia: colonia,
                    direccionDetalle: direccionDetalle,
                    rtn: rtn,
                    puntoreFerencia: puntoreFerencia
                }).then((response) => {
                    setIsLoading(false);
                    toastRef.current.show("Direccion guardada correctamente")
                    setShowModal(false);
                }).catch(() => {
                    setIsLoading(false);
                    toastRef.current.show("Error al guardar direccion")
                })
        }
    }

    return(
        <ScrollView style={styles.view}>
            <Input
                placeholder="Nombre direccion"
                containerStyle={styles.input}
                defaultValue={nombreDireccion || ""}
                onChange={(e) => setNombreDireccion(e.nativeEvent.text)}
                errorMessage={errors.nombreDireccion}
            />

            <Input
                placeholder="Quien recibe"
                containerStyle={styles.input}
                defaultValue={quienRecibe || ""}
                onChange={(e) => setQuienRecibe(e.nativeEvent.text)}
                errorMessage={errors.quienRecibe}
            />

            <Input
                placeholder="Telefono"
                containerStyle={styles.input}
                defaultValue={telefono || ""}
                onChange={(e) => setTelefono(e.nativeEvent.text)}
                errorMessage={errors.telefono}
            />

            <Input
                placeholder="Colonia"
                containerStyle={styles.input}
                defaultValue={colonia || ""}
                onChange={(e) => setColonia(e.nativeEvent.text)}
                errorMessage={errors.colonia}
            />

            <Input
                placeholder="R.T.N"
                containerStyle={styles.input}
                defaultValue={rtn || ""}
                onChange={(e) => setRtn(e.nativeEvent.text)}
            />

            <Input
                placeholder="Detalle direccion"
                containerStyle={styles.input}
                multiline={true}
                numberOfLines={4}
                defaultValue={direccionDetalle || ""}
                onChange={(e) => setDireccionDetalle(e.nativeEvent.text)}
                errorMessage={errors.direccionDetalle}
            />

            <Input
                placeholder="Punto referencia"
                containerStyle={styles.input}
                multiline={true}
                numberOfLines={4}
                defaultValue={puntoreFerencia || ""}
                onChange={(e) => setPuntoReferencia(e.nativeEvent.text)}
            />

            <Button
                title="Guardar Direccion"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={() => onSubmit()}
                loading={isLoading}
            />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    view: {
        paddingTop: 10,
        paddingBottom: 10,
    },
    input: {
        marginBottom: 10
    },
    btnContainer: {
        marginTop: 20,
        marginBottom: 20,
        width: "95%"
    },
    btn: {
        backgroundColor: "#00a680"
    }
});