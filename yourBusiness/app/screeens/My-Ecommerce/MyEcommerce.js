import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Icon, Button } from 'react-native-elements'
import { firebaseApp } from "../../Utils/firebase";
import * as firebase from "firebase/app";
import "firebase/firestore";
import ListMyEcommerce from "../../Components/MyE-commerce/ListMyEcommerce";
const db = firebase.firestore(firebaseApp);

import { useFocusEffect } from '@react-navigation/native';

export default function MyEcommerce(props) {
    const [mybusiness, setMyBusiness] = useState([]);
    const [totalBusiness, setTotalBusiness] = useState(0);
    const [startBusiness, setStartBusiness] = useState(null);
    const [loading, setIsLoading] = useState(false);
    const [userLogger, setUserLogger] = useState(false);
    const [userInfo, setUserInfo] = useState({});
    const { navigation } = props;
  
    firebase.auth().onAuthStateChanged((user) => {
        user ? setUserLogger(true) : setUserLogger(false);
    });

    useFocusEffect(
        React.useCallback(() => {
            if(userLogger)
            {
                const userId = firebase.auth().currentUser.uid;
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

                db.collection("User")
                    .doc(userId)
                    .get()
                    .then((response) => {
                        const data = response.data();
                        setUserInfo(data);
                    })
            }
        }, [userLogger])
    );

    const loadNextBusiness = () => {

        const resultBusiness = [];
        mybusiness.length < totalBusiness && setIsLoading(true);

        db.collection("Ecommerce")
            .where("userId", "==", firebase.auth().currentUser.uid)
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

    if(!userLogger)
    {
        return <UserNoLogger navigation={navigation} />
    }

    return (
        <View style={styles.viewBody}>
            {
                userLogger ?
                        userInfo.userType == 2 ?
                        <>
                            <ListMyEcommerce
                                business={mybusiness}
                                loadNextBusiness={loadNextBusiness}
                                loading={loading}
                                navigation={navigation}
                            />

                            <Icon
                                reverse
                                type="material-community"
                                name="plus"
                                color="#00a680"
                                containerStyle={styles.btnContainer}
                                onPress={() => navigation.navigate("add-business")}
                            />
                        </> : <UserType navigation={navigation} />
                    : 
                    <UserNoLogger navigation={navigation} />
            }
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

function UserType(props)
{
    const { navigation } = props;
    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Icon
                type="material-community" name="alert-outline" size={50}
            />
            <Text style={{ fontSize: 20, fontWeight: "bold", textAlign: "center" }}>Necesitas iniciar sesion con una cuenta empresarial</Text>
            <Button
                title="Ir al login"
                containerStyle={{ marginTop: 20, width: "80%" }}
                buttonStyle={{ backgroundColor: "#00a680" }}
                onPress={() => navigation.navigate("account")}
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
