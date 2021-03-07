import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import { FireSQL } from 'firesql';
import { Icon, Button } from 'react-native-elements'
import { firebaseApp } from "../../Utils/firebase";
import * as firebase from "firebase/app";
import "firebase/firestore";
import ListOrders from "../../Components/Order/ListOrdersNotification";
import ListEcommerceOrder from "../../Components/Order/ListEcommerceOrderMiPyme";

const db = firebase.firestore(firebaseApp);

export default function OrdersToProcess(props)
{
    const { navigation } = props;
    const [userLogger, setUserLogger] = useState(false);
    const [loading, setIsLoading] = useState(false);
    const [orders, setOrders] = useState([]);
    const [userInfo, setUserInfo] = useState({});
    const [ecommerces, setEcommerce] = useState([]);
    const fireSQL = new FireSQL(firebase.firestore(), { includeId: "id" })

    firebase.auth().onAuthStateChanged((user) => {
        user ? setUserLogger(true) : setUserLogger(false);
    });

    useFocusEffect(
        React.useCallback(() => {
            if(userLogger)
            {
                setIsLoading(true);
                const userId = firebase.auth().currentUser.uid;
                db.collection("User")
                    .doc(userId)
                    .get()
                    .then((response) => {
                        const user = response.data();
                        setUserInfo(user);
                        if(user.userType == 1)
                        {
                            fireSQL.query(`SELECT * FROM Orders WHERE userId = '${userId}'`)
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
                        } else {
                            fireSQL.query(`SELECT * FROM Ecommerce WHERE userId = '${userId}'`)
                            .then((response) => {
                                setEcommerce(response);
                                setIsLoading(false)
                            })
                        }
                    });
            }
        }, [userLogger])
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

    if(!userLogger)
    {
        return <UserNoLogger navigation={navigation} />
    }

    return (
        <View style={styles.viewBody}>
            {
                userLogger ?
                        userInfo.userType == 1 ?
                        <>
                            <ListOrders
                                orders={orders}
                                loading={loading}
                                navigation={navigation}
                                userType="User"
                            />
                        </> : 

                        <ListEcommerceOrder
                            business={ecommerces}
                            loading={loading}
                            navigation={navigation}
                        />
                    : 
                    <UserNoLogger navigation={navigation} />
            }
        </View>
    )   
}

function UserNoLogger(props)
{
    const { navigation } = props;
    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Icon
                type="material-community" name="alert-outline" size={50}
            />
            <Text style={{ fontSize: 20, fontWeight: "bold", textAlign: "center" }}>Necesitas iniciar secion</Text>
            <Button
                title="Ir al login"
                containerStyle={{ marginTop: 20, width: "80%" }}
                buttonStyle={{ backgroundColor: "#00a680" }}
                onPress={() => navigation.navigate("account")}
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