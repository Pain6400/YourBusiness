import React from "react"
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Icon } from "react-native-elements";

export default function EcommerceProducts(props) {
    const { navigation } = props;
    const { id, userId } = props.route.params;

    return (
        <View style={styles.viewBody}>
            <ScrollView vertical style={styles.viewBody}>
                <Text>{id}</Text>
            </ScrollView>
            <Icon
                reverse
                type="material-community"
                name="plus"
                color="#00a680"
                containerStyle={styles.btnContainer}
                onPress={() => navigation.navigate("AddProduct", { id, userId })}
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
    },
    viewBody: {
        flex: 1,
        backgroundColor: "#fff"
    },
});