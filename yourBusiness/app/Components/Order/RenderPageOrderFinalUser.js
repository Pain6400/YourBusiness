import React, { useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, TextInput, Modal  } from "react-native";
import { Icon, Button, Image, } from 'react-native-elements';
import { encode } from "base-64";
import { WebView } from 'react-native-webview';

import { firebaseApp } from "../../Utils/firebase";
import * as firebase from "firebase/app";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);

export default function RenderPage(props) {
    const { titlePage, product,shoopingCart, currentPage, setIsLoading, setReload, setCurrentPage } = props;
    const { cartId, productId, productName, images, productPrice, OrderId, toastRefCart, status } = product;
    const [PaymentId, setPeymentId] = useState("");
    const [showModal, setShowModal] = useState(false);

    console.log(shoopingCart)
    const PaypalPeyment = ()  => {
        setIsLoading(true);

        const key = 'Aa74kr26YwCHZKWWoRDcKU7CfDargDfgbvuQ3sA8NgD4vjZT-UM4St8GnyupuNg205PzEJHP5fC-reBW';
        const secret = 'EEzK8A6Co9XwGu0THMc4aOxqjlBnHe4ONtjJPz_7lyTM3e56_TdJD-rbM-T1fJ0ibOf3TfuyyxHHKWxA';

        fetch("https://api-m.sandbox.paypal.com/v1/oauth2/token", {
            method: 'POST',
            body: 'grant_type=client_credentials',
            headers: {
                'Authorization' : 'Basic ' + encode(key + ":" + secret),
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then((response) => response.json())
        .then((response) => { 
            const token = response.access_token;
            console.log(token);
            const value = parseFloat(((productPrice * shoopingCart.quantity) / 24.33)).toFixed(2);
            fetch("https://api-m.sandbox.paypal.com/v2/checkout/orders", {
                method: 'POST',
                headers: {
                    'Authorization' : 'Bearer ' + token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "intent": "CAPTURE",
                    "purchase_units": [
                        {
                            "amount": {
                                "currency_code": "USD",
                                "value": `${value}`
                            }
                        }
                    ]

                  })
            }).then((responseOrder) => responseOrder.json())
            .then((response) => { 
                console.log(response)
                setPeymentId(response.id)
                setIsLoading(false)
                setShowModal(true)
            })
        })
    }

    const OrderFinish = () => {
        setIsLoading(true)
        db.collection("Orders").doc(OrderId).update({
            status: "Received"
        }).then(() => {
            setIsLoading(false)
            setCurrentPage(3);
        })
    }

    const PaymentComplite = (data) => {
        
        if(data.title === "Apply for PayPal Credit") {
            setShowModal(false)

            db.collection("Orders").doc(OrderId).update({
                status: "Paid"
            }).then(() => {
                setCurrentPage(2);
            })
        }
    }

    if(currentPage == 0) {
        return (
            <View style={styles.rowItem}>
              <Text style={styles.title}>{titlePage}</Text>
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
      
                  <View style={styles.containerBody}>
                      <Text style={styles.name}>{productName}</Text>
                      <Text style={styles.info}>Precio:                   {productPrice}</Text>
                      <Text style={styles.info}>Cantidad:                 {shoopingCart.quantity}</Text>
                      <Text style={styles.info}>Total:                    {productPrice * shoopingCart.quantity}</Text>
                      <TextInput
                          multiline={true}
                          numberOfLines={4}
                          style={styles.textarea}
                          value="El pedido esta en proceso de aprobacion, espere hasta que la empresa valide su pedido."
                      />      
                  </View>
            </View>
          );
    } else if(currentPage == 1) {
        return (
            <View style={styles.rowItem}>
                <Modal
                    visible={showModal}
                    onRequestClose={() => setShowModal(false)}
                >
                    <WebView 
                        source={{ uri: `https://www.sandbox.paypal.com/checkoutnow?token=${PaymentId}`}}
                        onNavigationStateChange={(data) => PaymentComplite(data) }
                    />
                </Modal>
              <Text style={styles.title}>{titlePage}</Text>
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
      
                  <View style={styles.containerBody}>
                      <Text style={styles.name}>{productName}</Text>
                      <Text style={styles.info}>Precio:                   {productPrice}</Text>
                      <Text style={styles.info}>Cantidad:                 {shoopingCart.quantity}</Text>
                      <Text style={styles.info}>Total:                    {productPrice * shoopingCart.quantity}</Text>
                      <TextInput
                          multiline={true}
                          numberOfLines={4}
                          style={styles.textarea}
                          value="El pedido ha sido aprobado, realice el pago para proceder con el envio"
                      />
                      <Button
                          title="Pagar"
                          containerStyle={styles.btnPagar}
                          buttonStyle={styles.btnPagarStyle}
                          onPress={PaypalPeyment}
                      />
      
                  </View>
            </View>
          );
    } else if(currentPage == 2) {
        return (
            <View style={styles.rowItem}>
              <Text style={styles.title}>{titlePage}</Text>
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
      
                  <View style={styles.containerBody}>
                      <Text style={styles.name}>{productName}</Text>
                      <Text style={styles.info}>Precio:                   {productPrice}</Text>
                      <Text style={styles.info}>Cantidad:                 {shoopingCart.quantity}</Text>
                      <Text style={styles.info}>Total:                    {productPrice * shoopingCart.quantity}</Text>
                      <TextInput
                          multiline={true}
                          numberOfLines={4}
                          style={styles.textarea}
                          value="El pedido esta siendo procesado para enviarselo a su casa, una vez su producto haya sido entregado debe de reportar que ya fue entregado."
                      />
                      <Button
                          title="Entregado"
                          containerStyle={styles.btnPagar}
                          buttonStyle={styles.btnPagarStyle}
                          onPress={OrderFinish}
                      />
      
                  </View>
            </View>
        )
    } else if (currentPage == 3) {
        return(
            <View style={styles.rowItem}>
              <Text style={styles.title}>{titlePage}</Text>
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
      
                  <View style={styles.containerBody}>
                      <Text style={styles.name}>{productName}</Text>
                      <Text style={styles.info}>Precio:                   {productPrice}</Text>
                      <Text style={styles.info}>Cantidad:                 {shoopingCart.quantity}</Text>
                      <Text style={styles.info}>Total:                    {productPrice * shoopingCart.quantity}</Text>
                      <TextInput
                          multiline={true}
                          numberOfLines={4}
                          style={styles.textarea}
                          value="El pedido ha sido entregado"
                      />
                    <Icon
                        type="material-community" name="check-outline" size={50}
                    />
      
                  </View>

            </View>
        )
    }  else {
        return <Text></Text>
    }
  };

  const styles = StyleSheet.create({
    btnPagar: {
        padding: 5,
        marginTop: 10,
        width: "95%"
    },
    btnPagarStyle: {
        backgroundColor: "#00a680"
    },
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
    },
    containerBody: {
        marginLeft: 20, marginTop: 20
    },
    title: {
        flex: 1,
        fontSize: 20,
        color: '#333333',
        paddingVertical: 16,
        fontWeight: "600",
      },
      body: {
        flex: 1,
        fontSize: 15,
        color: '#606060',
        lineHeight: 24,
        marginRight: 8,
      },
      rowItem: {
        flex: 3,
        paddingVertical: 20,
      },
  })