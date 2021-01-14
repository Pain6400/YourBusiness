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

 import { Image, Icon, Button, Divider } from "react-native-elements";
 import { useFocusEffect } from '@react-navigation/native';
 import { size } from "lodash";
 import Toast from "react-native-easy-toast";
 import Loading from "../../Components/Loading";

 import { firebaseApp } from "../../Utils/firebase";
 import firebase from "firebase/app";
 import "firebase/storage";

 const db = firebase.firestore(firebaseApp);   

export default function ShoppingCard(props){
    const toastRef = useRef();
    const { navigation } = props;
    const [products, setProducts] = useState(null);
    const [userLogger, setUserLogger] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [reload, setReload] = useState(false);

    firebase.auth().onAuthStateChanged((user) => {
        user ? setUserLogger(true) : setUserLogger(false);
    });


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
                            const productData = {};
                            productData.cartId = doc.id;
                            productData.productId = doc.data().productId;
                            productData.quantity = doc.data().quantity;

                            idProductsArray.push(productData)
                        })

                        if (size(idProductsArray) !== 0) {
                            getDataProduct(idProductsArray).then((response) => {
                                const products = [];
                                response.forEach((doc) => {
                                    const product = doc.data();
                                    product.productId = doc.id;
                                    const quantity = idProductsArray.filter(f => f.productId == product.productId);
                                    product.quantity = quantity[0].quantity;
                                    product.cartId = quantity[0].cartId;
                                    products.push(product);
                                });

                                setProducts(products);
                            }).catch((error) => {
                                console.log(error)
                            })
                        }
                    });
            }
            setReload(false)
        }, [userLogger, reload])
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
        idProductsArray.forEach((product) => {
            const result = db.collection("Product").doc(product.productId).get();
            //console.log(result)
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
                        renderItem={(product) => <ProductRender 
                                                    product={product} 
                                                    setIsLoading={setIsLoading}
                                                    toastRef={toastRef}
                                                    setReload={setReload}
                                                /> }
                        keyExtractor={(item, index) => index.toString()}
                    />
                ) : (
                    <View style={styles.loader}>
                        <ActivityIndicator size="large" color="#00ff00" />
                        <Text style={{ textAlign: "center" }}>Cargando productos</Text>
                    </View>
                )
            }

            <Toast ref={toastRef} position="center" opacity={0.9} />
            <Loading text="Cargando productos" isVisible={isLoading} />
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
    const { product, setIsLoading, toastRef, setReload } = props;
    const { productName, images, productDescription, productPrice, quantity, cartId } = product.item;
    const [cantidad, setCantidad] = useState(quantity);

    const updateQuantity = (type) => {
        if(type === 1) {

            const dato = cantidad -1;
            if(dato === 0) {
            } else {         
                setIsLoading(true)
                const cart = db.collection("ShoppingCard").doc(cartId);
                cart.update({
                    quantity: cantidad -1
                }).then(() => {
                    setCantidad(cantidad - 1);
                    setIsLoading(false);
                }).catch(() => {
                    setIsLoading(false)
                })
            }
        } else {
            setIsLoading(true)
            const cart = db.collection("ShoppingCard").doc(cartId);
            cart.update({
                quantity: cantidad + 1
            }).then(() => {
                setCantidad(cantidad + 1);
                setIsLoading(false)
            }).catch(() => {
                setIsLoading(false)
            });
        }
    }
    
    const deleteCart = () => {
        Alert.alert(
            "Eliminar producto del carrito",
            "¿Estas seguro de eliminar el producto del carrito de compra?",
            [
                {
                    text: "Cancelar",
                    style: "cancel"
                },
                {
                    text: "Eliminar",
                    onPress: removeCart,
                }
            ],
            { cancelable: false}
        );
    }

    const removeCart = () => {
        setIsLoading(true);
        db.collection("ShoppingCard")
            .doc(cartId)
            .delete()
            .then(() => {   
                setIsLoading(false);
                setReload(true)
                toastRef.current.show("Producto eliminado correctamente");
            }).catch((e) => {
                setIsLoading(false);
                toastRef.current.show("Error al eliminar producto");
            })
    }

    return (
        <TouchableOpacity onPress={() => console.log(cartId)}>
            <View style={styles.product}>
                <View style={styles.viewImage}>
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
                </View>
                <View>
                    <Text style={styles.name}>{productName}</Text>
                    <Text style={styles.total}>L. {productPrice}</Text>
                    <Text>{productDescription.substr(0, 60)}</Text>
                    <View style={styles.form}>
                    <Button
                            title="-"
                            buttonStyle={styles.btnmas}
                            containerStyle={styles.btnMasContainer}
                            onPress={() => updateQuantity(1)}
                            type="outline"
                        />
                        <View style={styles.viewQuantity}>
                            <Text style={styles.quantity}>{cantidad}</Text>
                        </View>
                        <Button
                            title="+"
                            buttonStyle={styles.btnmas}
                            containerStyle={styles.btnMasContainer}
                            onPress={() => updateQuantity(2)}
                            type="outline"
                        />
                        <Icon
                            type="material-community"
                            name="delete-outline"
                            color="#f00"
                            containerStyle={styles.card}
                            size={40}
                            onPress={deleteCart}
                            underlayColor="transparent"
                        />
                    </View>
                </View>
            </View>
            <Text numberOfLines={1}>
            ______________________________________________________________
            </Text>
        </TouchableOpacity>
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
    product: {
        flexDirection: "row",
        margin: 10,
    },
    image: {
        width: 100,
        height: 100
    },
    name: {
        fontWeight: "bold"
    },
    total: {
        color: "#00a680"
    },
    card: {
        //padding: 15,
    },
    viewImage: {
        marginRight: 15
    },
    form: {
        flex: 1,
        flexDirection: "row",
        marginTop: 10
    },
    btnmas: {
        width: 50,
        height: 40
    },
    quantity: {
        borderWidth: 1,
        borderColor: "gray",
        width: 50,
        textAlign: "center",
        borderRadius: 10,
        height: 30,
        fontSize: 15,
        fontWeight: "bold"
    },
    viewQuantity: {
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    btnMasContainer:{
        marginRight: 10,
    },
});