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

export default function ShoppingCard(props){
    const { navigation } = props;
    const [products, setProducts] = useState(null);
    const [userLogger, setUserLogger] = useState(false);

    firebase.auth().onAuthStateChanged((user) => {
        user ? setUserLogger(true) : setUserLogger(false);
    });

    //console.log(products)

    useFocusEffect(
        useCallback(() => {
            if (userLogger) {
                const idUser = firebase.auth().currentUser.uid;
                db.collection("ShoppingCard")
                    .where("idUser", "==", idUser)
                    .get()
                    .then((response) => {
                        const idProductsArray = [];

                        response.forEach((doc) => {
                            idProductsArray.push(doc.data().productId)
                        })

                        if (size(idProductsArray) !== 0) {
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
            }
        }, [userLogger])
    )

    if(!userLogger)
    {
        return <UserNoLogger navigation={navigation} />
    }

    if(products?.length === 0)
    {
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
        <View style={styles.viewBody}>
            {products ?
                (
                    <FlatList 
                        data={products}
                        renderItem={(product) => <ProductRender product={product} /> }
                        keyExtractor={(item, index) => index.toString()}
                    />
                ) : (
                    <View style={styles.loader}>
                        <ActivityIndicator size="large" color="#00ff00" />
                        <Text style={{ textAlign: "center" }}>Cargando productos</Text>
                    </View>
                )
            }
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

function ProductRender(props) {
    const { product } = props;
    const { productName, images } = product.item;

    console.log(product)
    return (
        <View style={styles.products}>
            <TouchableOpacity onPress={() => console.log("g")}>
                <Image 
                    resizeMode="cover"
                    style={styles.image}
                    PlaceholderContent={<ActivityIndicator color="#fff" />}
                    source={
                        images[0]
                        ? { uri : images[0]}
                        : require("../../../assets/Images/no-image.png")
                    }
                />
                <View style={styles.info}>
                    <Text style={styles.name}>{productName}</Text>
                    <Icon 
                        type="material-community"
                        name="cart"
                        color="#f00"
                        containerStyle={styles.card}
                        onPress={() => console.log("d")}
                        underlayColor="transparent"
                    />
                </View>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    viewBody: {
        flex: 1,
        backgroundColor: "#f2f2f2"
    },
    loader: {
        marginTop: 10,
        marginBottom: 10
    },
    products: {
        margin: 10,
    },
    image: {
        width: "100%",
        height: 180
    },
    info: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        paddingBottom: 10,
        marginTop: -30,
        backgroundColor: "#fff"
    },
    name: {
        fontWeight: "bold",
        fontSize: 15
    },
    card: {
        marginTop: - 35,
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 100
    } 
});