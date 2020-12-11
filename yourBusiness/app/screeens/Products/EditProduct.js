import React, { useState, useRef } from "react";
import { View, Text } from "react-native";
import Toast from "react-native-easy-toast";
import Loading from "../../Components/Loading";
import EditProductForm from "./EditProductForm";

export default function EditProduct(props) {
    const { navigation } = props;
    const { item } = props.route.params;;
    const [isLoading, setIsLoading] = useState(false);
    const toastRef = useRef();

    const product = JSON.parse(item);
    console.log(product)
    return (
        <View>
            <EditProductForm
                toastRef={toastRef}
                setIsLoading={setIsLoading}
                navigation={navigation}
            />
            <Toast ref={toastRef} position="center" opacity={0.9} />
            <Loading isVisible={isLoading} text="Creando producto" />
        </View>
    )
}