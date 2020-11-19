import React, { useState, useRef } from "react";
import { View } from "react-native";
import Toast from "react-native-easy-toast";
import Loading from "../../Components/Loading";
import AddBusinessForm from "../../Components/Business/AddBusinessForm";

export default function AddBusiness (props) {
    const { navigation } = props;
    const [isLoading, setIsLoading] = useState(false);
    const toastRef = useRef();

    return (
        <View>
            <AddBusinessForm
                toastRef={toastRef}
                isLoading={isLoading}
                navigation={navigation}
            />
            <Toast ref={toastRef} position="center" opacity={0.9} />
            <Loading isVisible={isLoading} text="Cargando negocios" />
        </View>
    )
}
