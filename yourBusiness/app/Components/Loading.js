import React from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import { Overlay } from "react-native-elements";

const Loading = props => {
    const { isVisible, text } = props;

    return (
        <Overlay 
            isVisible={isVisible}
            overlayStyle={styles.overlay}
        >
            <View style={styles.view}>
                <ActivityIndicator size="large" color="#00a680" />
                {text && <Text style={styles.text}>{text}</Text>}
            </View>
        </Overlay>
    );
}

const styles = StyleSheet.create({
    overlay: {
        height: 100,
        width: 200,
        backgroundColor: "#fff",
        borderColor: "#00a680",
        borderWidth: 2,
        borderRadius: 10
    },
    view: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        color: "#00a680",
        textTransform: "uppercase",
        marginTop: 10
    }
});
export default Loading;