import React from "react"
import { View, Text, StyleSheet } from "react-native";
import MapEcommerceDetail from "./MapEcommerceDetail";
import { ListItem, Button } from 'react-native-elements'

import { map } from "lodash"
export default function EcommerceInfo(props) {
    const { 
            location, 
            name, 
            address, 
            phone, 
            email, 
            timeOpen, 
            timeClose,
            webPage,
            linkWhatsapp,
            linkFcebook,
            navigation,
            id,
            userId
        } = props;

    const listInfo =  [
        {
            text: address,
            iconName: "map-marker",
            iconType: "material-community",
            action: null
        }, 
        {
            text: phone,
            iconName: "phone",
            iconType: "material-community",
            action: null
        }, 
        {
            text: email,
            iconName: "at",
            iconType: "material-community",
            action: null
        },
        {
            text: `De ${timeOpen} a ${timeClose}`,
            iconName: "clock-outline",
            iconType: "material-community",
            action: null
        },
        {
            text: webPage,
            iconName: "web",
            iconType: "material-community",
            action: null
        },
        {
            text: linkFcebook,
            iconName: "facebook",
            iconType: "material-community",
            action: null
        },
        {
            text: linkWhatsapp,
            iconName: "whatsapp",
            iconType: "material-community",
            action: null
        }
    ];

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
            {map(listInfo, (item, index) => (
                <ListItem 
                    key={index}
                    title={item.text}
                    leftIcon={{
                        name: item.iconName,
                        type: item.iconType,
                        color: "#00a680"
                    }}
                    containerStyle={styles.containerListItem}
                />
            ))}

            <Button 
                title="PRODUCTOS"
                containerStyle={styles.btnContainerAddProduct}
                buttonStyle={styles.btnAddPrduct}
                onPress={() => navigation.navigate("EcommerceProducts", { id: id, userId: userId }) }
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
    },
    containerListItem: {
        borderBottomColor: "#d8d8d8",
        borderBottomWidth: 1 
    },
    btnContainerAddProduct: {
        marginTop: 20,
        width: "95%"
    },
    btnAddPrduct:{
        backgroundColor: "#00a680"
    },
})
