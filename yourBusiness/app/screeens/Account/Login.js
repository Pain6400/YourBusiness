import React from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { Divider } from "react-native-elements";

export default function Login(props){
    const { navigation } = props;
    return (
        <ScrollView>
            <Image
                source={require("../../../assets/Images/tiendas.png")}
                resizeMode="contain"
                style={styles.logo}
            />
            <View style={styles.container}>
                <Text>Form</Text>
                <CreateAccount navigation={navigation} />
            </View>
            <Divider style={styles.divider} />
        </ScrollView>
    )
}

function CreateAccount(props) {
    const { navigation } = props;
    return (
        <Text 
            style={styles.register}>¿Aun no tienen una cuenta?
            <Text 
                style={styles.btnRegister}
                onPress={() => navigation.navigate("register")}
            >{ " " }Registrate</Text>
        </Text>

    )
}

const styles = StyleSheet.create({
    logo: {
        width: "100%",
        height: 150,
        marginTop: 20
    },
    container: {
        marginRight: 40,
        marginLeft: 40,
    },
    register: {
        marginTop: 15,
        marginLeft: 10,
        marginRight: 10
    },
    btnRegister: {
        color: "#00a680"
    },
    divider: {
        backgroundColor: "#00a680",
        margin: 40
    }
});