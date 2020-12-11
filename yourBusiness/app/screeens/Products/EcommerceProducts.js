import React, { useState, useEffect } from "react"
import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity, Image } from "react-native";
import { Icon } from "react-native-elements";
import { size, map } from "lodash";


import { firebaseApp } from "../../Utils/firebase";
import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";

const db = firebase.firestore(firebaseApp); 

const widthScreen = Dimensions.get("window").width;

export default function EcommerceProducts(props) {
    const { navigation } = props;
    const { id, userId } = props.route.params;
    const [products, setProducts] = useState([]);

    useEffect(() => {      
        const products = [];

        db.collection("Product")
        .where("ecommerceId", "==", id)
        .where("userId", "==", userId)
        .get()
        .then((response) => {
            response.forEach((docs) => {
                const product = docs.data();
                product.productId = docs.id;
                products.push(product);
            });
            setProducts(products);
        })
    }, [])

    return (
        <View style={styles.viewBody}>
            <ScrollView vertical style={styles.viewBody}>
          <View style={styles.container}>
            {map(products, (item, index) => (
              <Product
                key={index}
                item={item}
                navigation={navigation}
              />
            ))}
          </View>
        </ScrollView>
            <Icon
                reverse
                type="material-community"
                name="plus"
                color="#00a680"
                containerStyle={styles.btnContainer}
                onPress={() => navigation.navigate("AddProduct", { id, userId })}
            />
        </View>
    )
}

function Product(props) {
    const { item, navigation} = props;
    const { images, productName, productPrice } = item;
    return (
      <TouchableOpacity
          onPress={() => navigation.navigate("editProduct", { item: JSON.stringify(item) }) }
      >
        <View style={styles.product}>
          <Image
            style={styles.image}
            source={{ uri: images[0] }}
          />
          <Text style={styles.text}>{productName}</Text>
          <Text style={styles.text}>L.{productPrice}</Text>
        </View>
      </TouchableOpacity>
    );
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
    },
    viewBody: {
        flex: 1,
        backgroundColor: "#fff"
    },
    product: {
        height: widthScreen / 2,
        width: widthScreen / 2,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 30
      },
      image: {
        width: '100%',
        height: '100%',
      },
      container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
      },
      text: {
        paddingTop: 2,
        color: "grey",
   },
});
