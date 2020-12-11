import { map, size } from "lodash";
import React, { useState } from "react";
import { StyleSheet, View, ScrollView, Image, Dimensions } from "react-native";
import { Button } from "react-native-elements";
import uuid from "random-uuid-v4";

import UploadImages from "../../Components/UploadImages";
import FormAdd from "../Product/FormAdd";

import { firebaseApp } from "../../Utils/firebase";
import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";

const db = firebase.firestore(firebaseApp); 

const widthScreen = Dimensions.get("window").width;

export default function AddProductForm(props) {
    const { navigation, setIsLoading, toastRef, id, userId } = props;
    const [imagesSelected, setImageSelected] = useState([]);
    const [productName, setProductName] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [productPrice, setProductPrice] = useState(0);
    const [productCategory, setProductCategory] = useState(0);

    const addProduct = () => {
        if(
            !productName ||
            !productDescription ||
            !productPrice ||
            productCategory == 0 ||
            !productCategory
        ) {
            toastRef.current.show("Todos los campos son obligatorios", 3000);
        } else if(size(imagesSelected) === 0) {
            toastRef.current.show("Debe de subir al menos una imagen", 3000);
        } else {
            setIsLoading(true);
            UplodadImagesStorage().then((response) => {
                db.collection("Product")
                    .add({
                        userId: userId,
                        ecommerceId: id,
                        productName: productName,
                        productDescription: productDescription,
                        productPrice: productPrice,
                        productCategory: productCategory,
                        images: response,
                        status: true,
                        createAt: new Date(),
                    }).then(() => {
                        setIsLoading(false);
                        navigation.goBack();
                    }).catch(() => {
                        setIsLoading(false);
                        toastRef.current.show("Error al crear producto", 3000)
                    })
            });
        }
    }

    const UplodadImagesStorage = async () => {
        const imageBlod = [];

        await Promise.all(
            map(imagesSelected, async (image) => {
                const response = await fetch(image);
                const blod = await response.blob();
                const ref = firebase.storage().ref("Products").child(uuid());
    
                await ref.put(blod).then(async (result) => {
                    await firebase
                            .storage()
                            .ref(`Products/${result.metadata.name}`)
                            .getDownloadURL()
                            .then((imageUrl) => {
                                imageBlod.push(imageUrl)
                            });
                })
            })
        );

        return imageBlod;
    }

    return(
        <ScrollView style={styles.scrollView}>
            <ImageEcommerce imageBusiness={imagesSelected[0]} />

            <UploadImages
                toastRef={toastRef}
                imagesSelected={imagesSelected}
                setImageSelected={setImageSelected}
            />
            
            <FormAdd 
                setProductName={setProductName}
                setProductDescription={setProductDescription}
                setProductPrice={setProductPrice}
                setProductCategory={setProductCategory}
                productCategory={productCategory}
            />

            <Button
                title="Guardar"
                onPress={addProduct}
                buttonStyle={styles.btn}
            />
        </ScrollView>
    )
}

function ImageEcommerce(props) {
    const { imageBusiness } = props;
    return (
        <View style={styles.viewPhote}>
            <Image  
                source={ imageBusiness 
                    ? { uri: imageBusiness } 
                    : require("../../../assets/Images/no-image.png")
                }
                style={{ width: widthScreen, height: 200 }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    scrollView: {
        height: "100%"
    },
    viewPhote: {
        alignItems: "center",
        height: 200,
        marginBottom: 20
    },
    btn: {
        backgroundColor: "#00a680",
        margin: 20
    },
})