import React, { useState, useEffect } from "react"
import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableWithoutFeedback, Image } from "react-native";
import { Icon } from "react-native-elements";
import { size, map } from "lodash";


import { firebaseApp } from "../../Utils/firebase";
import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";

const db = firebase.firestore(firebaseApp); 

const widthScreen = Dimensions.get("window").width;

export default function Products(props) {
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
                products.productId = docs.id;
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
        </View>
    )
}

function Product(props) {
    const {item, navigation} = props;
    const { images, productName } = item;
    // const goMovie = () => {
    //   navigation.navigate('movie', {id});
    // };

    return (
      <TouchableWithoutFeedback>
        <View style={styles.movie}>
          <Image
            style={styles.image}
            source={{ uri: images[0] }}
          />
        </View>
      </TouchableWithoutFeedback>
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
    movie: {
        height: widthScreen / 2,
        width: widthScreen / 2,
        alignItems: 'center',
        justifyContent: 'center',
      },
      image: {
        width: '100%',
        height: '100%',
      },
      container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
      }
});
