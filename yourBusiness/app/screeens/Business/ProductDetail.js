import React, { useState, useRef } from "react";
import { StyleSheet, ScrollView, Dimensions } from "react-native";
import Carousel from "../../Components/Carousel";
import TitleEcommerce from "../../Components/TitleEcommerce";
import { ListItem } from 'react-native-elements'
import { map } from "lodash"
import RNPickerSelect from 'react-native-picker-select';
const screenWith = Dimensions.get("window").width;
import { Icon, Button } from 'react-native-elements';
import Toast from "react-native-easy-toast";


export default function ProductDetail(props){

    const toastRef = useRef();

    const { item } = props.route.params;
    const product = JSON.parse(item);
    const [queantity, setQuantity] = useState(0);
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
            label: '     1',
            value: 1,
        },
        {
            label: '     2',
            value: 2,
        },
        {
            label: '     3',
            value: 3,
        },
        {
            label: '     4',
            value: 4,
        },
        {
            label: '     5',
            value: 5,
        },
        {
            label: '     6',
            value: 6,
        },
        {
            label: '     7',
            value: 7,
        },
        {
            label: '     8',
            value: 8,
        },
        {
            label: '     9',
            value: 9,
        },
        {
            label: '     10',
            value: 10,
        }
    ]

    const addCard = () => {
        if(queantity != 0 && queantity != null)
        {
            console.log("ok")
        } else {
            toastRef.current.show("Debe de seleccionar una cantidad")
        }
    }
    
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
                value={queantity}
                key={queantity}
                onValueChange={(value) => setQuantity(value)}
                items={cantidad}
                style={styles.quantity}
            />

            <Button
                title="Agregar al carrito"
                containerStyle={styles.btnContainerAddProduct}
                buttonStyle={styles.btnAddPrduct}
                icon={
                    <Icon 
                        type="material-community"
                        name="cart-outline"
                        color="#FFFFFF"
                    />
                }
                onPress={addCard}
            />

            <Toast ref={toastRef} position="center" opacity={0.9} />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    viewBody: {
        flex: 1,
        backgroundColor: "#fff"
    },
    btnContainerAddProduct: {
        marginTop: 20,
        width: "95%",
        padding: 15
    },
    quantity: {
        padding: 15,
        borderWidth: 2,
        borderBottomColor: "#DCD2D2",
        borderBottomEndRadius: 2
    }
});