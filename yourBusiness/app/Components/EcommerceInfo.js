import React from "react"
import { View, Text, StyleSheet } from "react-native";
import MapEcommerceDetail from "./MapEcommerceDetail";

export default function EcommerceInfo(props) {
    const { location, name, address } = props;

    return (
        <View style={styles.viewInfo}>
            <Text style={styles.ecommerce}>
                Informacion de la Tienda
            </Text>

            <MapEcommerceDetail 
                location={location}
                name={name}
                height={120}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    viewInfo: {
        margin: 15,
        marginTop: 25
    },
    ecommerce: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10 
    }
})
