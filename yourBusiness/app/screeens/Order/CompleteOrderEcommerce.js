import React, { useEffect, useState, useRef } from "react";
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, TextInput } from "react-native";
import Loading from "../../Components/Loading";
import { Icon, Button, Image,  } from 'react-native-elements';
import { firebaseApp } from "../../Utils/firebase";
import Toast from "react-native-easy-toast";
import * as firebase from "firebase/app";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);

export default function CompleteOrderEcommerce(props){
    const toastRef = useRef();
    const { navigation } = props;
    const { product } = props.route.params;

    const { cartId, productId, productName, images, productPrice, ecommerceId, quantity, toastRefCart, status } = product;
    const [shoopingCart, setShoppingCart] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const estado = status == "Open" ? "En proceso de aprobacion" : 
                    status == "processing" ? "Aprobado" :
                    status == "Paid" ? "Enviando" :
                    status == "Received" ? "Revibido"  : "";

    useEffect(() => {
        db.collection("ShoppingCard")
            .doc(product.cartId)
            .get()
            .then((response) => {
                const data = response.data();
                setShoppingCart(data)
            })
    }, [])

    return(
        <ScrollView style={{ height: "100%" }}>
            <View style={{ marginLeft: 20, marginTop: 20 }}>
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
                <Text style={styles.info}>Cantidad:                 {shoopingCart.quantity}</Text>
                <Text style={styles.info}>Total:                    {productPrice * shoopingCart.quantity}</Text>
                <Text style={styles.name}>{estado}</Text>
                <TextInput 
                    multiline={true}
                    numberOfLines={4}
                    style={styles.textarea}
                    value="El producto esta en proceso de aprobacion, espere hasta que la empresa valide su pedido."
                />
            </View>
            <Toast ref={toastRef} position="center" opacity={0.9} />
            <Loading text="Guardando pedido" isVisible={isLoading} />
        </ScrollView>
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
    }, 
    viewAddress: {
        borderWidth: 2,
        padding: 30,
        borderRadius: 10
    },
     address: {
        fontWeight: "bold",
     },
     textarea: {
        borderColor: "grey",
        borderWidth: 1,
        padding: 5,
        width: "95%"
     }
})