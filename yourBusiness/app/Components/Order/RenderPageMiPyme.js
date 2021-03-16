import React, { useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, TextInput  } from "react-native";
import { Icon, Button, Image, } from 'react-native-elements';

import { firebaseApp } from "../../Utils/firebase";
import * as firebase from "firebase/app";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);

export default function RenderPage(props) {
    const { titlePage, product,shoopingCart, currentPage, setIsLoading, setCurrentPage, navigation } = props;
    const { userOrderId, productName, images, productPrice, OrderId} = product;

    const OrderFinish = () => {
        setIsLoading(true)
        db.collection("Orders").doc(OrderId).update({
            status: "processing"
        }).then(() => {
            setIsLoading(false)
            setCurrentPage(1);
        })
    }

    const infoCliente = () => {
        db.collection("Address")
            .doc(userOrderId)
            .get()
            .then((response) => {
                const user = response.data();
                navigation.navigate("UserInfo", user)
            })
    }

    if(currentPage == 0) {
        return (
            <View style={styles.rowItem}>
                <View style={{ flexDirection: "row" }}>
                    <Button
                        title="Ver informacion del cliente"
                        onPress={infoCliente}
                        buttonStyle={styles.btn}
                    />
                </View>
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
                          value="Este pedido esta en la espera de su aprobacion.."
                      />      
                    <Button
                        title="Aprobar"
                        containerStyle={styles.btnPagar}
                        buttonStyle={styles.btnPagarStyle}
                        onPress={OrderFinish}
                    />
                  </View>
            </View>
          );
    } else if(currentPage == 1) {
        return (
            <View style={styles.rowItem}>
                <View style={{ flexDirection: "row" }}>
                    <Button
                        title="Ver informacion del cliente"
                        onPress={infoCliente}
                        buttonStyle={styles.btn}
                    />
                </View>
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
                          value="El pedido ha sido aprobado, espere a que el usuario realice el pago para proceder con el envio."
                      />     
                  </View>
            </View>
          );
    } else if(currentPage == 2) {
        return (
            <View style={styles.rowItem}>
                <View style={{ flexDirection: "row" }}>
                    <Button
                        title="Ver informacion del cliente"
                        onPress={infoCliente}
                        buttonStyle={styles.btn}
                    />
                </View>
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
                          value="El pedido ha sido pagado, realizando envio."
                      />      
                  </View>
            </View>
        )
    } else if (currentPage == 3) {
        return(
            <View style={styles.rowItem}>
                <View style={{ flexDirection: "row" }}>
                    <Button
                        title="Ver informacion del cliente"
                        onPress={infoCliente}
                        buttonStyle={styles.btn}
                    />
                </View>
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