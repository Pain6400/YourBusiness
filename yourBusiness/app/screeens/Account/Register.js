import React, { useRef } from "react";
import { View, StyleSheet, Image  } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Toast from "react-native-easy-toast";

import RegisterForm from "../../Components/Account/RegisterForm";

export default function Register(props){
    const { navigation } = props;
    const toastRef = useRef();
    return (
        <KeyboardAwareScrollView>
            <Image
                source={require("../../../assets/Images/tiendas.png")}
                resizeMode="contain"
                style={styles.logo}
            />
            <View style={styles.viewForm}> 
                <RegisterForm toastRef={toastRef} navigation={navigation} />
            </View>
            <Toast ref={toastRef} position="center" opacity={0.9} />
        </KeyboardAwareScrollView>
    );
}

const styles = StyleSheet.create({
    logo: {
        width: "100%",
        height: 150,
        marginTop: 20
    },
    viewForm: {
        marginRight: 40,
        marginLeft: 40
    }
});