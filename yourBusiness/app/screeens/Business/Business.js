import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { ListItem, Icon } from 'react-native-elements'

export default function Business(){    
    return(
        <View style={styles.viewBody}>
            <Text>La amo Tania Gisela Morales Avila</Text>
            <Text>By: Kevin Mejia</Text>

            <Icon 
                reverse
                type="material-community"
                name="plus"
                color="#00a680"
                containerStyle={styles.btnContainer}
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
