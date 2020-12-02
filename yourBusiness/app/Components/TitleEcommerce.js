import React from "react"
import { View, Text, StyleSheet } from "react-native";
import { Rating } from 'react-native-elements';

export default function TitleEcommerce(props) {
    const { name, description, rating } = props;

    return (
        <View style={styles.ecommerceTitle}>
            <View style={{ flexDirection: "row" }}>
                <Text style={styles.ecommerceName}>{name}</Text>
                <Rating 
                    style={styles.rating}
                    imageSize={20}
                    readonly
                    startingValue={parseFloat(rating)}
                />
            </View>
            <Text style={styles.ecommerceDescription}>{description}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    ecommerceTitle: {
        padding: 15,
    },
    ecommerceName: {
        fontSize: 20,
        fontWeight: "bold"
    },
    ecommerceDescription: {
        marginTop: 5,
        color: "grey"
    },
    rating: {
        position: "absolute",
        right: 0
    }
});