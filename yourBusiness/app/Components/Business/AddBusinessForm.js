import React, { useState } from "react";
import { StyleSheet, View, ScrollView, Image, Dimensions } from "react-native";
import { Input, Button } from "react-native-elements";
import UploadImages from "../../Components/UploadImages";
import GoogleMap from "../GoogleMap";
const widthScreen = Dimensions.get("window").width;

export default function AddRestaurantForm(props) {

    const { isLoading, navigation, toastRef } = props;
    const [businessName, setBusinessName] = useState("");
    const [businessAddress, setBusinessAddress] = useState("");
    const [businessDescription, setBusinessDescription] = useState("");
    const [imagesSelected, setImageSelected] = useState([]);
    const [isVisibleMap, setIsVisibleMap] = useState(false);

    const addBusiness = () => {
        console.log(imagesSelected)

    }

    return (
        <ScrollView style={styles.scrollView}>

            <ImageBusiness imageBusiness={imagesSelected[0]} />
            <FormAdd 
                setBusinessName={setBusinessName}
                setBusinessAddress={setBusinessAddress}
                setBusinessDescription={setBusinessDescription}
                setIsVisibleMap={setIsVisibleMap}
            />

            <UploadImages
                toastRef={toastRef}
                imagesSelected={imagesSelected}
                setImageSelected={setImageSelected}
            />
            <Button 
                title="Guardar"
                onPress={addBusiness}
                buttonStyle={styles.btn}
            />

            <GoogleMap 
                isVisibleMap={isVisibleMap} 
                setIsVisibleMap={setIsVisibleMap}
            />
        </ScrollView>
    )
}

function FormAdd(props) {

    const { setBusinessName, setBusinessAddress, setBusinessDescription, setIsVisibleMap } = props;

    return (
        <View style={styles.viewForm}>
            <Input 
                placeholder="Nombre del restaurante"
                containerStyle={styles.input}
                onChange={e => setBusinessName(e.nativeEvent.text) }
            />
            <Input 
                placeholder="Direccion"
                containerStyle={styles.input}
                onChange={e => setBusinessAddress(e.nativeEvent.text)}
                rightIcon={{
                    type: "material-community",
                    name: "google-maps",
                    color: "#c2c2c2",
                    onPress: () => setIsVisibleMap(true)
                }}
            />
            <Input 
                placeholder="Descripcion"
                multiline={true}
                inputContainerStyle={styles.textArea}
                onChange={e => setBusinessDescription(e.nativeEvent.text)}
            />
        </View>
    )
}

function ImageBusiness(props) {
    const { imageBusiness } = props;
    return (
        <View style={styles.viewPhote}>
            <Image  
                source={ imageBusiness 
                    ? { uri: imageBusiness } 
                    : require("../../../assets/Images/no-image.png")
                }
                style={{ width: widthScreen, height: 200 }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    scrollView: {
        height: "100%"

    },
    viewForm: {
        marginLeft: 10,
        marginRight: 10
    },
    input:{
        marginBottom: 10
    },
    textArea: {
        height: 100,
        width: "100%",
        padding: 0,
        margin: 0
    },
    btn: {
        backgroundColor: "#00a680",
        margin: 20
    },
    viewImage: {
        flexDirection: "row",
        marginLeft: 20,
        marginTop: 20,
        marginRight: 30
    },
    icon: {
        alignItems: "center",
        justifyContent: "center",
        marginRight: 10,
        height: 70,
        width: 70,
        backgroundColor: "#e3e3e3"
    },
    avatar: {
        width: 70,
        height: 70,
        marginRight: 10
    },
    viewPhote: {
        alignItems: "center",
        height: 200,
        marginBottom: 20
    }
});