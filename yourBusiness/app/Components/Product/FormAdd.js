import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Input } from "react-native-elements";
import RNPickerSelect from 'react-native-picker-select';

export default function FormAdd(props) {
    const { 
            setProductName, 
            setProductDescription,
            setProductPrice,
            setProductCategory,
            productCategory
        } = props;
        
    const Categories = [
            {
                label: '--Seleccione una categoria--',
                value: 0,
            },
            {
                value: 1,
                label: "Alimentos",
            },
            {
                value: 2,
                label: "Arte y Fotografia"
            },
            {
                value: 3,
                label: "Zapatos"
            },
            {
                value: 4,
                label: "Belleza"
            },
            {
                value: 5,
                label: "Bordados y Serigrafia"
            },
            {
                value: 6,
                label: "Cafe"
            },
            {
                value: 7,
                label: "Educacion"
            },
            {
                value: 8,
                label: "Entrenamiento"
            },
            {
                value: 9,
                label: "Fitness"
            },
            {
                value: 10,
                label: "Frutas y Verduras"
            },
            {
                value: 11,
                label: "Hogar y Muebles"
            },
            {
                value: 12,
                label: "Limpieza e Higiene"
            },
            {
                value: 13,
                label: "Mascotas"
            },
            {
                value: 14,
                label: "Moda"
            },
            {
                value: 15,
                label: "Restaurantes"
            },
            {
                value: 16,
                label: "Tecnologia"
            },
            {
                value: 17,
                label: "Servicios"
            }
        ]
    return (
        <View style={styles.viewForm}>
            <Input
                placeholder="Nombre del producto"
                containerStyle={styles.input}
                onChange={e => setProductName(e.nativeEvent.text)}
            />
            <Input
                placeholder="Descripcion del producto"
                containerStyle={styles.input}
                onChange={e => setProductDescription(e.nativeEvent.text)}
            />
            <Input
                placeholder="Precio del producto"
                containerStyle={styles.input}
                keyboardType="numeric"
                onChange={e => setProductPrice(e.nativeEvent.text)}
            />

            <RNPickerSelect
                value={productCategory}
                onValueChange={(value) => setProductCategory(value)}
                items={Categories}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    viewForm: {
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10
    },
    input:{
        marginBottom: 10
    },
});

