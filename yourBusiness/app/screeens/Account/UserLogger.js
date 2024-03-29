import React, { useRef, useState, useEffect }  from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import Toast from "react-native-easy-toast";
import * as firebase from "firebase";
import Loading from "../../Components/Loading";
import InfoUser from "../../Components/Account/InfoUser";
import AccountOptions from "../../Components/Account/AccountOptions";

export default function UserLogger(){

    const toastRef = useRef();
    const [loading, setLoading] = useState(false);
    const [loadingText, setLoadingText] = useState("");
    const [userInfo, setUserInfo] = useState(null);
    const [reloadUserInfo, setReloadUserInfo] = useState(false);

    useEffect(() => {
        (async () => {
            firebase.auth().onAuthStateChanged((user) => {
                !user ? setUserInfo({}) : setUserInfo(user);
            })
        })()

        setReloadUserInfo(false);
    }, [reloadUserInfo])

    return(
        <View style={styles.viewUserInfo}>
            { userInfo && <InfoUser 
                            userInfo={userInfo} 
                            toastRef={toastRef} 
                            setLoading={setLoading}
                            setLoadingText={setLoadingText}
                          />}

            <AccountOptions userInfo={userInfo} toastRef={toastRef} setReloadUserInfo={setReloadUserInfo} />
            <Button 
                title="Cerrar sesion"
                buttonStyle={styles.btnCloseSesion}
                titleStyle={styles.btnCloseSesionTitle}
                onPress={() => firebase.auth().signOut()} />
            <Toast ref={toastRef} position="center" opacity={0.9} />
            <Loading isVisible={loading} text={loadingText} />
        </View>
    )
}

const styles = StyleSheet.create({
    viewUserInfo:{
        minHeight: "100%",
        backgroundColor: "#f2f2f2",

    },
    btnCloseSesion:{
        marginTop: 30,
        borderRadius: 0,
        backgroundColor: "#fff",
        borderTopColor: "#e3e3e3",
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderBottomColor: "#e3e3e3",
        paddingTop: 10,
        paddingBottom: 10
    },
    btnCloseSesionTitle:{
        color: "#00a680"
    }
});