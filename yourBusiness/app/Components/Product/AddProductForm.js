import { map, size } from "lodash";
import React, { useState } from "react";
import { StyleSheet, View, ScrollView, Image, Dimensions } from "react-native";
import { Input, Button } from "react-native-elements";
import RNPickerSelect from 'react-native-picker-select';
import uuid from "random-uuid-v4";

import FormAdd from "../Product/FormAdd";

import { firebaseApp } from "../../Utils/firebase";
import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";

const db = firebase.firestore(firebaseApp); 

const widthScreen = Dimensions.get("window").width;

export default function AddProductForm(props) {
    const { navigation, isLoading, toastRef, id, userId } = props;
    const [imagesSelected, setImageSelected] = useState([]);

    return(
        <ScrollView style={styles.scrollView}>
            <ImageEcommerce imageBusiness={imagesSelected[0]} />
            <FormAdd />
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
    }
})