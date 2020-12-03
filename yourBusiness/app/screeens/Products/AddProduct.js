import React, { useState, useRef } from "react";
import { View } from "react-native";
import Toast from "react-native-easy-toast";
import Loading from "../../Components/Loading";
import AddProductForm from "../../Components/Product/AddProductForm";

export default function AddProduct(props) {
    const { navigation, id, userId } = props;
    const [isLoading, setIsLoading] = useState(false);
    const toastRef = useRef();

    return (
        <View>
            <AddProductForm
                toastRef={toastRef}
                setIsLoading={setIsLoading}
                navigation={navigation}
                id={id}
                userId={userId}
            />
            <Toast ref={toastRef} position="center" opacity={0.9} />
            <Loading isVisible={isLoading} text="Creando E-comerce" />
        </View>
    )
}