import React from "react";
import { View, Text, StyleSheet, ActivityIndicator, TextInput  } from "react-native";

export default function UserInfo(props) {
    const { colonia, direccionDetalle, nombreDireccion, puntoreFerencia, quienRecibe, telefono } = props.route.params;
    return (
        <View style={styles.containerBody}> 
            <Text style={styles.info}>Quien Recibe: {quienRecibe}</Text>
            <Text style={styles.info}>Telefono: {telefono}</Text>
            <Text style={styles.info}>Colonia: {colonia}</Text>
            <Text style={styles.info}>Direccion: {direccionDetalle}</Text>
            <Text style={styles.info}>Pundo de Referencia: {puntoreFerencia}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    containerBody: {
        flex: 1,
        margin: 20
    },
    info: {
        marginTop: 10,
        fontWeight: "bold"
    },
})