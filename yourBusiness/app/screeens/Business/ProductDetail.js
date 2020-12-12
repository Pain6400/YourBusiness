import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView, Dimensions } from "react-native";
import Carousel from "../../Components/Carousel";
import TitleEcommerce from "../../Components/TitleEcommerce";

const screenWith = Dimensions.get("window").width;

export default function ProductDetail(props){

    const { item } = props.route.params;
    const product = JSON.parse(item);

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
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    viewBody: {
        flex: 1,
        backgroundColor: "#fff"
    },
});