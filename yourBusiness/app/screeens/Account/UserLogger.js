import React, { useRef, useState, useEffect }  from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import Toast from "react-native-easy-toast";
import * as firebase from "firebase";
import Loading from "../../Components/Loading";
import InfoUser from "../../Components/Account/InfoUser";

export default function UserLogger(){

    const toastRef = useRef();
    const [loading, setLoading] = useState(false);
    const [loadingText, setLoadingText] = useState("");
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        (async () => {
            const user = await firebase.auth().currentUser;
            setUserInfo(user);
        })()
    }, [])

    return(
        <View style={styles.viewUserInfo}>
            { userInfo && <InfoUser userInfo={userInfo} toastRef={toastRef} />}
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