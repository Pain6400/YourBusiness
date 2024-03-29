import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Icon } from 'react-native-elements'
import { firebaseApp } from "../../Utils/firebase";
import * as firebase from "firebase/app";
import "firebase/firestore";
import ListBusiness from "../../Components/Business/ListBusiness";
const db = firebase.firestore(firebaseApp);

import { useFocusEffect } from '@react-navigation/native';

export default function Business(props) {

    const [business, setBusiness] = useState([]);
    const [totalBusiness, setTotalBusiness] = useState(0);
    const [startBusiness, setStartBusiness] = useState(null);
    const [loading, setIsLoading] = useState(false);

    const { navigation } = props;

    useFocusEffect(
        React.useCallback(() => {
            db.collection("Ecommerce").get().then((snap) => {
                setTotalBusiness(snap.size)
            })
    
            const resultBusiness = [];
    
            db.collection("Ecommerce")
                .orderBy("createAt", "desc")
                .limit(10)
                .get()
                .then((response) => {
                    setStartBusiness(response.docs[response.docs.length - 1]);
    
                    response.forEach((docs) => {
                        const business = docs.data();
                        business.id = docs.id;
                        resultBusiness.push(business);
                    });
    
                    setBusiness(resultBusiness);
                })
        }, [])
      );


    const loadNextBusiness = () => {
        const resultBusiness = [];
        business.length < totalBusiness && setIsLoading(true);

        db.collection("Ecommerce")
            .orderBy("createAt", "desc")
            .startAfter(startBusiness.data().createAt)
            .limit(10)
            .get()
            .then((response) => {
                if(response.docs.length > 0) {
                    setStartBusiness(response.docs[response.docs.length - 1]);
                } else {
                    setIsLoading(false);
                }

                response.forEach((doc) => {
                    const business = doc.data();
                    business.id = doc.id;
                    resultBusiness.push(business);
                });

                setBusiness([...business , ...resultBusiness])
            })
    }

    return (
        <View style={styles.viewBody}>
            <ListBusiness
                business={business}
                loadNextBusiness={loadNextBusiness}
                loading={loading}
                navigation={navigation}
            />

        </View>
    )
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
    }
})
