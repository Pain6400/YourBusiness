import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, Dimensions } from "react-native";
import Loading from "../../Components/Loading";
import Carousel from "../../Components/Carousel";

import { firebaseApp } from "../../Utils/firebase";
import * as firebase from "firebase/app";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);
const screenWith = Dimensions.get("window").width;

export default function MyEcommerceDetail(props) {
    const { navigation } = props;
    const { id, name } = props.route.params;
    navigation.setOptions({ title: name })
    const [ecommerce, setEcommerce] = useState(null);
    
    useEffect(() => {   
        db.collection("Ecommerce")
            .doc(id)
            .get()
            .then((respone) => {
                const data = respone.data();
                data.id = respone.id;
                setEcommerce(data);
            })
    }, []);


    if(!ecommerce) return <Loading isVisible={true} text="cargando" />
    
    return (
        <ScrollView vertical style={styles.viewBody}>
            <Carousel 
                arrayImages={ecommerce.images}
                height={250}
                width={screenWith}
            />
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    avatar: {
        width: 70,
        height: 70,
        marginRight: 10
    },
    viewPhote: {
        alignItems: "center",
        height: 200,
        marginBottom: 20
    },
    viewBody: {
        flex: 1,
        backgroundColor: "#fff"
    }
});