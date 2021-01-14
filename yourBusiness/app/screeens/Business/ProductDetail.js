import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, ScrollView, Dimensions } from "react-native";
import Carousel from "../../Components/Carousel";
import TitleEcommerce from "../../Components/TitleEcommerce";
import { ListItem } from 'react-native-elements'
import { map } from "lodash"
import RNPickerSelect from 'react-native-picker-select';
const screenWith = Dimensions.get("window").width;
import { Icon, Button } from 'react-native-elements';
import Toast from "react-native-easy-toast";

import { firebaseApp } from "../../Utils/firebase";
import * as firebase from "firebase/app";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);

export default function ProductDetail(props){

    const toastRef = useRef();
    const [isInCard, setIsInCard] = useState(false);
    const [userLogger, setUserLogger] = useState(false);
    const { item } = props.route.params;
    const product = JSON.parse(item);
    const [queantity, setQuantity] = useState(0);

    const listInfo =  [
        {
            text: product.productPrice,
            iconName: "cash",
            iconType: "material-community",
            action: null
        }, 
    ];

    const cantidad = [
        {
            label: 'Cantidad',
            value: 0
        },
        {
            label: '     1',
            value: 1,
        },
        {
            label: '     2',
            value: 2,
        },
        {
            label: '     3',
            value: 3,
        },
        {
            label: '     4',
            value: 4,
        },
        {
            label: '     5',
            value: 5,
        },
        {
            label: '     6',
            value: 6,
        },
        {
            label: '     7',
            value: 7,
        },
        {
            label: '     8',
            value: 8,
        },
        {
            label: '     9',
            value: 9,
        },
        {
            label: '     10',
            value: 10,
        }
    ]

    useEffect(() => {
        if(userLogger)
        {
            db.collection("ShoppingCard")
                .where("productId", "==", product.productId)
                .where("idUser", "==", firebase.auth().currentUser.uid)
                .get()
                .then((response) => {
                    if(response.docs.length == 1)
                    {
                        setIsInCard(true);
                    }
                })
        }
        
    }, [userLogger, product])

    firebase.auth().onAuthStateChanged((user) => {
        user ? setUserLogger(true) : setUserLogger(false);
    })

    const addCard = () => {
        if(!userLogger)
        {
            toastRef.current.show("Para agregar al carrito debe de inisiar sesión");
        } else {
            if(queantity != 0 && queantity != null)
            {
                const payLoad = {
                    idUser: firebase.auth().currentUser.uid,
                    productId: product.productId,
                    quantity: queantity
                }

                db.collection("ShoppingCard")
                    .add(payLoad)
                    .then(() => {
                        setIsInCard(true);
                        toastRef.current.show("Producto agregado al carrito de compra")
                    }).catch(() => {
                        toastRef.current.show("Error al agregar al carrito el producto")
                    })

            } else {
                toastRef.current.show("Debe de seleccionar una cantidad")
            }
        }
    }
    
    const removeCard = () => {
        db.collection("ShoppingCard")
            .where("productId", "==", product.productId)
            .where("idUser", "==", firebase.auth().currentUser.uid)
            .get()
            .then((response) => {
                response.forEach((doc) => {
                    const idCard = doc.id;

                    db.collection("ShoppingCard")
                        .doc(idCard)
                        .delete()
                        .then(() => {
                            setIsInCard(false);
                            toastRef.current.show("Producto eliminado del carrito de compra")
                        }).catch(() => {
                            toastRef.current.show("Error al eliminar producto del carrito")
                        })
                });
            })
    }

    return (
        <ScrollView vertical style={styles.viewBody}>
            <Carousel
                arrayImages={product.images}
                height={250}
                width={screenWith}
            />

            <TitleEcommerce
                name={product.productName}
                description={product.productDescription}
                rating={0}
            />

            {map(listInfo, (item, index) => (
                <ListItem
                    key={index}
                    title={item.text}
                    leftIcon={{
                        name: item.iconName,
                        type: item.iconType,
                        color: "#00a680"
                    }}
                    containerStyle={styles.containerListItem}
                />
            ))}

            <RNPickerSelect
                value={queantity}
                key={queantity}
                onValueChange={(value) => setQuantity(value)}
                items={cantidad}
                style={styles.quantity}
            />

            <Button
                title={ isInCard ? "Eliminar del carrito" : "Agregar al carrito"}
                containerStyle={styles.btnContainerAddProduct}
                buttonStyle={isInCard ? styles.btnAddPrductIncard : styles.btnAddPrduct}
                icon={
                    <Icon 
                        type="material-community"
                        name={ isInCard ? "cart-arrow-right" : "cart-outline" }
                        color={"#FFFFFF"}
                    />
                }
                onPress={isInCard ? removeCard : addCard}
            />

            <Toast ref={toastRef} position="center" opacity={0.9} />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    viewBody: {
        flex: 1,
        backgroundColor: "#fff"
    },
    btnContainerAddProduct: {
        marginTop: 20,
        width: "95%",
        padding: 15
    },
    quantity: {
        padding: 15,
        borderWidth: 2,
        borderBottomColor: "#DCD2D2",
        borderBottomEndRadius: 2
    },
    btnAddPrductIncard:{
        backgroundColor: "#F52C2C",
    },
    btnAddPrduct: {
        backgroundColor: "#00a680",
    }
});