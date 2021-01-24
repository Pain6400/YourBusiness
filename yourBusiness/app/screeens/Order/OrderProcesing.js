import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import { FireSQL } from 'firesql';
import { Icon, Button } from 'react-native-elements'
import { firebaseApp } from "../../Utils/firebase";
import * as firebase from "firebase/app";
import "firebase/firestore";
import ListOrders from "../../Components/Order/ListOrders";

const db = firebase.firestore(firebaseApp);

export default function OrderProcesing(props) {
    const { navigation } = props;
    const { id } = props.route.params;
    const [loading, setIsLoading] = useState(false);
    const [orders, setOrders] = useState([]);
    const fireSQL = new FireSQL(firebase.firestore(), { includeId: "id" });

    useFocusEffect(
        React.useCallback(() => {

                setIsLoading(true);
                fireSQL.query(`SELECT * FROM Orders WHERE ecommerceId = '${id}'`)
                .then((response) => {
                    getProducts(response).then((responseP) => {
                        const productArray = [];
                        responseP.forEach((doc, index) => {
                            const product = doc.data();
                            product.productId = doc.id;
                            product.addressId = response[index].addressId;
                            product.cartId = response[index].cartId;
                            product.OrderId = response[index].id;
                            product.paymentMethod = response[index].paymentMethod;
                            product.status = response[index].status;
                            product.userOrderId = response[index].userId;
                            productArray.push(product)
                        });

                        setOrders(productArray)
                        setIsLoading(false)
                    })
                })
        }, [])
    );

    const getProducts = (array) => {
        const productsArray = [];

        array.forEach((item) => {
            const response = db.collection("Product")
                .doc(item.productId)
                .get();

            productsArray.push(response)
        })

        return Promise.all(productsArray)
    }

    return (
        <View style={styles.viewBody}>
            <ListOrders
                orders={orders}
                loading={loading}
                navigation={navigation}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    viewBody: {
        flex: 1,
        backgroundColor: "#fff"
    },
    btnContainer: {
        position: "absolute",
        bottom: 10,
        right: 10,
        shadowColor: "black",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.5
    }
})