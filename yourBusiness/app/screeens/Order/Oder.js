import React, { useEffect, useState, useRef } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";

import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import { Icon, Button, Image } from 'react-native-elements';
import {Picker} from '@react-native-picker/picker';
import Loading from "../../Components/Loading";
import { isEmpty  } from "lodash";
import Toast from "react-native-easy-toast";
import { FireSQL } from 'firesql';


import { firebaseApp } from "../../Utils/firebase";
import firebase from "firebase/app";

const db = firebase.firestore(firebaseApp); 

export default function Order(props){
    const toastRef = useRef();
    const { navigation } = props;
    const { cartId, productId, productName, images, productPrice, ecommerceId, quantity, toastRefCart } = props.route.params;
    const [pago, setPago] = useState("");
    const [address, setAddress] = useState({});
    const [errors, setErrors] = useState(false);
    const [isComplete, setIsComplete] = useState(false);
    const [order, setOrder] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    console.log(ecommerceId)
    const fireSQL = new FireSQL(firebase.firestore(), { includeId: "id" });

    useEffect(() => {
        const user = firebase.auth().currentUser.uid;
        db.collection("Address")
        .doc(user)
        .get()
        .then((response) => {
            const data = response.data();
            data.id = response.id;
            setAddress(data)
        }).catch((error) => {
            console.log(error)
        })

        setOrder({});
        fireSQL.query(`SELECT * FROM Orders WHERE cartId='${cartId}' AND productId='${productId}' AND userId='${user}'`)
                .then((response) => {
                    if(response.length > 0)
                    {
                        setOrder(response[0]);
                        setPago(response[0].paymentMethod)
                        setIsComplete(true);
                    }
                })
    }, [])

    const onNextStep = () => {
        if (isEmpty(pago)) {
            setErrors(true)
            toastRef.current.show("Debe de seleccionar un metodo de pago");
        } else {
          setErrors(false)
        }
    };


    const submit = async () => {

        setIsLoading(true);
        if(!isComplete)
        {
            db.collection("Orders")
            .add({
                userId: firebase.auth().currentUser.uid,
                addressId: address.id,
                productId: productId,
                cartId: cartId,
                paymentMethod: pago,
            }).then((response) => {
                toastRefCart.current.show("Pedido guardado correctamente", 3000)
                navigation.goBack();
            }).catch(() => {
                toastRef.current.show("Error al crear pedido", 3000)
            })
        } else {
            db.collection("Orders")
                .doc(order.id)
                .update({
                    paymentMethod: pago
                }).then((response) => {
                    toastRefCart.current.show("Pedido guardado correctamente", 3000)
                    navigation.goBack();
                }).catch(() => {
                    toastRef.current.show("Error al crear pedido", 3000)
                })
        }

        db.collection("Ecommerce")
            .doc(ecommerceId)
            .get()
            .then((response) => {
                const data = response.get();
                const email = data.email;
            })
        setIsLoading(false);
    }

    return (
        <View style={{ flex: 1 }}>
            <ProgressSteps isComplete={isComplete}>
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
                <ProgressStep label="Metodo de pago" onNext={onNextStep} errors={errors}>
                    <View style={{ alignItems: 'center' }}>
                        <Picker
                            selectedValue={pago}
                            style={{ height: 50, width: "100%" }}
                            onValueChange={(item, index) => setPago(item)}
                        >
                            <Picker.Item label="--Seleccione el metodo de pago--" value="" />
                            <Picker.Item label="Efectivo" value="Efectivo" />
                            <Picker.Item label="Paypal" value="Paypal" />
                        </Picker>
                    </View>
                </ProgressStep>
                <ProgressStep label="Direccion" onSubmit={submit}>
                    <View style={{ alignItems: 'center' }}>
                        {
                            address ? (
                                <View style={styles.viewAddress}>
                                        <Text style={styles.address}>{address.nombreDireccion}</Text>
                                        <Text>{address.quienRecibe}</Text>
                                        <Text>{address.colonia}</Text>
                                        <Text>{address.telefono}</Text>
                                        <Text>{address.rtn}</Text>
                                        <Text>{address.direccionDetalle}</Text>
                                        <Text>{address.puntoreFerencia}</Text>
                                </View>
                            ) : (
                                <UserNoLogger navigation={navigation} />
                            )
                        }
                    </View>
                </ProgressStep>
            </ProgressSteps>
            <Toast ref={toastRef} position="center" opacity={0.9} />
            <Loading text="Guardando pedido" isVisible={isLoading} />
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
            <Text style={{ fontSize: 20, fontWeight: "bold", textAlign: "center" }}>Necesitas crear una direccion</Text>
            <Button
                title="Ir al crear una direccion"
                containerStyle={{ marginTop: 20, width: "80%" }}
                buttonStyle={{ backgroundColor: "#00a680" }}
                onPress={() => navigation.navigate("account")}
            />
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
    }, 
    viewAddress: {
        borderWidth: 2,
        padding: 30,
        borderRadius: 10
    },
     address: {
        fontWeight: "bold",
     }
})