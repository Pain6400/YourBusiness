import React, { useState, useRef, useCallback } from "react";
import { 
    StyleSheet,
    View,
    Text,
    FlatList,
    ActivityIndicator,
    TouchableOpacity,
    Alert
 } from "react-native";

 import { Image, Icon, Button } from "react-native-elements";
 import { useFocusEffect } from '@react-navigation/native';
 import Loading from "../../Components/Loading";
 import { size } from "lodash";

 import { firebaseApp } from "../../Utils/firebase";
 import firebase from "firebase/app";
 import "firebase/storage";

 const db = firebase.firestore(firebaseApp);   

export default function ShoppingCard(){
    const [products, setProducts] = useState(null);
    const [userLogger, setUserLogger] = useState(false);

    firebase.auth().onAuthStateChanged((user) => {
        user ? setUserLogger(true) : setUserLogger(false);
    });

    useFocusEffect(
        useCallback(() => { 
            const idUser = firebase.auth().currentUser.uid;
            db.collection("ShoppingCard")
                .where("idUser", "==", idUser)
                .get()
                .then((response) => {
                    const idProductsArray = [];

                    response.forEach((doc) => {
                        idProductsArray.push(doc.data().productId)
                    })

                    if(idProductsArray) {
                        getDataProduct(idProductsArray).then((response) => {
                            const products = [];
                            response.forEach((doc) => {
                                const product = doc.data();
                                product.productId = doc.id;
                                products.push(product);
                            });
    
                            setProducts(products);
                        }).catch((error) => {
                            console.log(error)
                        })
                    }
                });
        }, [userLogger])
    )

    console.log(products)

    if(!products) {
        if(size(products) > 0) {
            return <Loading isVisible={true} text="Cargando productos" />
        }
    } else if(size(products) === 0) {
        return <NotFoundProducts />
    }

    const getDataProduct = (idProductsArray) => {
        const arrayProducts = [];

        idProductsArray.forEach((productId) => {
            const result = db.collection("Product").doc(productId).get();
            arrayProducts.push(result);
        });

        return Promise.all(arrayProducts);
    };

    return(
        <View>
            <Text>card</Text>
        </View>
    )
}

function NotFoundProducts() {
    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center"}}>
            <Icon type="material-community" name="alert-outline" size={50} />
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>No hay productos en el carrito</Text>
        </View>
    )
}