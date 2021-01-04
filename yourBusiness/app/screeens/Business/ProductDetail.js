import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView, Dimensions } from "react-native";
import Carousel from "../../Components/Carousel";
import TitleEcommerce from "../../Components/TitleEcommerce";
import { ListItem } from 'react-native-elements'
import { map } from "lodash"
import RNPickerSelect from 'react-native-picker-select';
const screenWith = Dimensions.get("window").width;

export default function ProductDetail(props){

    const { item } = props.route.params;
    const product = JSON.parse(item);

    const listInfo =  [
        {
            text: product.productPrice,
            iconName: "cash",
            iconType: "material-community",
            action: null
        }, 
    ];

    const cantidad = [
        {
            label: 'Cantidad',
            value: 0
        },
        {
            label: '1',
            value: 1,
        },
        {
            label: '2',
            value: 2,
        },
        {
            label: '3',
            value: 3,
        },
        {
            label: '4',
            value: 4,
        },
        {
            label: '5',
            value: 5,
        },
        {
            label: '6',
            value: 6,
        },
        {
            label: '7',
            value: 7,
        },
        {
            label: '8',
            value: 8,
        },
        {
            label: '9',
            value: 9,
        },
        {
            label: '10',
            value: 10,
        }
    ]

    return (
        <ScrollView vertical style={styles.viewBody}>
            <Carousel
                arrayImages={product.images}
                height={250}
                width={screenWith}
            />

            <TitleEcommerce
                name={product.productName}
                description={product.productDescription}
                rating={0}
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

            <RNPickerSelect
            	value={0}
                onValueChange={(value) => console.log(value)}
                items={cantidad}
                style={{ backgroundColor: '#000' }}
            />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    viewBody: {
        flex: 1,
        backgroundColor: "#fff"
    },
});