import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, Dimensions, Text } from "react-native";
import Loading from "../../Components/Loading";
import Carousel from "../../Components/Carousel";
import TitleEcommerce from "../../Components/TitleEcommerce";
import EcommerceInfo from "../../Components/EcommerceInfo";

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
    const [rating, setRating] = useState(0);


    useEffect(() => {   
        db.collection("Ecommerce")
            .doc(id)
            .get()
            .then((respone) => {
                const data = respone.data();
                data.id = respone.id;
                setEcommerce(data);
                setRating(data.rating);
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

            <TitleEcommerce 
                name={ecommerce.name}
                description={ecommerce.description}
                rating={rating}
            />
            <EcommerceInfo 
                location={ecommerce.location}
                name={ecommerce.name}
                address={ecommerce.address}
            />
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    viewBody: {
        flex: 1,
        backgroundColor: "#fff"
    },
});