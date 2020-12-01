import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Icon } from 'react-native-elements'
import { firebaseApp } from "../../Utils/firebase";
import * as firebase from "firebase/app";
import "firebase/firestore";
import ListMyEcommerce from "../../Components/MyE-commerce/ListMyEcommerce";
const db = firebase.firestore(firebaseApp);

import { useFocusEffect } from '@react-navigation/native';

export default function MyEcommerce(props) {
    const [user, setUser] = useState(null);
    const [mybusiness, setMyBusiness] = useState([]);
    const [totalBusiness, setTotalBusiness] = useState(0);
    const [startBusiness, setStartBusiness] = useState(null);
    const [loading, setIsLoading] = useState(false);
    const [userId, setUserId] = useState("");

    const { navigation } = props;
    useEffect(() => {      
        firebase.auth().onAuthStateChanged((userInfo) => {
            setUserId(userInfo.uid);
            setUser(userInfo);
        })
    }, [])

    useFocusEffect(
        React.useCallback(() => {
            
            db.collection("Ecommerce").where("userId", "==", userId).get().then((snap) => {
                setTotalBusiness(snap.size)
            })
    
            const resultBusiness = [];
    
            db.collection("Ecommerce")
                .where("userId", "==", userId)
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
    
                    setMyBusiness(resultBusiness);
                })
    
        }, [user])
    );

    const loadNextBusiness = () => {

        const resultBusiness = [];
        mybusiness.length < totalBusiness && setIsLoading(true);

        db.collection("Ecommerce")
            .where("userId", "==", userId)
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

                setMyBusiness([...mybusiness , ...resultBusiness])
            })    
    }

    return (
        <View style={styles.viewBody}>
            {user && (
                <ListMyEcommerce
                    business={mybusiness}
                    loadNextBusiness={loadNextBusiness}
                    loading={loading}
                    navigation={navigation}
                />
            )}
            {user && (
                <Icon
                    reverse
                    type="material-community"
                    name="plus"
                    color="#00a680"
                    containerStyle={styles.btnContainer}
                    onPress={() => navigation.navigate("add-business")}
                />
            )}
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
