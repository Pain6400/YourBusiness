import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import { Image } from "react-native-elements";

import { firebaseApp } from "../../Utils/firebase";
import firebase from "firebase/app";
import "firebase/storage";

const db = firebase.firestore(firebaseApp); 


export default function Order(props){
    const { navigation } = props;
    const { cartId, productId, productName, productDescription, images, productPrice, quantity } = props.route.params;

    return (
        <View style={{ flex: 1 }}>
            <ProgressSteps>
                <ProgressStep label="Resumen">
                    <View style={{ alignItems: 'center' }}>
                        <Image
                            resizeMode="cover"
                            style={styles.image}
                            PlaceholderContent={<ActivityIndicator color="#fff" />}
                            source={
                                images[0]
                                    ? { uri: images[0] }
                                    : require("../../../assets/Images/no-image.png")
                            }
                        />

                        <Text style={styles.name}>{productName}</Text>
                        <Text style={styles.info}>Precio:                   {productPrice}</Text>
                        <Text style={styles.info}>Cantidad:                 {quantity}</Text>
                        <Text>___________________________________________</Text>
                        <Text style={styles.info}>Total:                    {productPrice * quantity}</Text>
                    </View>
                </ProgressStep>
                <ProgressStep label="Metodo de pago">
                    <View style={{ alignItems: 'center' }}>
                        <Text>This is the content within step 2!</Text>
                    </View>
                </ProgressStep>
                <ProgressStep label="Direccion">
                    <View style={{ alignItems: 'center' }}>
                        <Text>This is the content within step 3!</Text>
                    </View>
                </ProgressStep>
            </ProgressSteps>
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        width: 150,
        height: 150
    },
    name: {
        fontWeight: "bold",
        fontSize: 20
    },
    info: {
        marginTop: 10
    }
})