import { size } from "lodash";
import React, { useState } from "react";
import { StyleSheet, View, ScrollView, Image, Dimensions } from "react-native";
import { Input, Button } from "react-native-elements";
import UploadImages from "../../Components/UploadImages";
import GoogleMap from "../GoogleMap";
import DatePicker from "react-native-modal-datetime-picker";
const widthScreen = Dimensions.get("window").width;

export default function AddRestaurantForm(props) {

    const { isLoading, navigation, toastRef } = props;
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const [businessName, setBusinessName] = useState("");
    const [businessAddress, setBusinessAddress] = useState("");
    const [businessDescription, setBusinessDescription] = useState("");
    const [imagesSelected, setImageSelected] = useState([]);
    const [isVisibleMap, setIsVisibleMap] = useState(false);
    const [locationBusiness, setLocationBusiness] = useState(null);
    const [phone, setPhone] = useState(null);
    const [linkWhatsapp, setLinkWhatsapp] = useState(null);
    const [linkFcebook, setLinkFacebook] = useState(null);
    const [identificationCard, setiIdentificationCard] = useState(null);
    const [representativeName, setRepresentativeName] = useState(null);
    const [email, setEmail] = useState(null);
    const [webPage, setWebPage] = useState(null);
    const [timeOpen, setTimeOpen] = useState(null);
    const [timeClose, setTimeClose] = useState(null);
    const [Category, setCategory] = useState(null);

    const addBusiness = () => {
        if(
            !businessName || 
            !businessAddress || 
            !businessDescription || 
            !phone ||
            !linkWhatsapp ||
            !identificationCard ||
            !representativeName ||
            !email ||
            !timeOpen ||
            !timeClose ||
            !Category
        ) {
            toastRef.current.show("Todos los campos son obligatorios", 3000);
        } else if(size(imagesSelected) === 0) {
            toastRef.current.show("Debe de subir al menos una imagen", 3000);
        } else if(!locationBusiness) {
            toastRef.current.show("Debes de selecionar una localizacion en el mapa para el negocio", 3000);
        } else {
            console.log("ok")
        }
    }

    return (
        <ScrollView style={styles.scrollView}>

            <ImageBusiness imageBusiness={imagesSelected[0]} />
            <FormAdd 
                setBusinessName={setBusinessName}
                setBusinessAddress={setBusinessAddress}
                setBusinessDescription={setBusinessDescription}
                setIsVisibleMap={setIsVisibleMap}
                locationBusiness={locationBusiness}
                setPhone={setPhone}
                setLinkWhatsapp={setLinkWhatsapp}
                setLinkFacebook={setLinkFacebook}
                setiIdentificationCard={setiIdentificationCard}
                setRepresentativeName={setRepresentativeName}
                setEmail={setEmail}
                setWebPage={setWebPage}
                setTimeOpen={setTimeOpen}
                setTimeClose={setTimeClose}
                setCategory={setCategory}
                isDatePickerVisible={isDatePickerVisible}
                setDatePickerVisibility={setDatePickerVisibility}
                timeOpen={timeOpen}
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
                toastRef={toastRef}
                setLocationBusiness={setLocationBusiness}
            />
        </ScrollView>
    )
}

function FormAdd(props) {

    const { 
        setBusinessName, 
        setBusinessAddress, 
        setBusinessDescription, 
        setIsVisibleMap,
        locationBusiness,
        setPhone,
        setRepresentativeName,
        setLinkWhatsapp,
        setLinkFacebook,
        setiIdentificationCard,   
        setEmail,
        setWebPage,
        setTimeOpen,
        setTimeClose,
        setCategory,
        isDatePickerVisible,
        setDatePickerVisibility,
        timeOpen
    } = props;

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
                    color: locationBusiness ? "#00a680" : "#c2c2c2",
                    onPress: () => setIsVisibleMap(true)
                }}
            />
            <Input 
                placeholder="Descripcion"
                multiline={true}
                inputContainerStyle={styles.textArea}
                onChange={e => setBusinessDescription(e.nativeEvent.text)}
            />

            <Input 
                placeholder="Telefono"
                keyboardType="numeric"
                containerStyle={styles.input}
                onChange={e => setPhone(e.nativeEvent.text)}
            />
            <Input 
                placeholder="Nombre del representante"
                containerStyle={styles.input}
                onChange={e => setRepresentativeName(e.nativeEvent.text)}
            />
            <Input 
                placeholder="Link whatsapp"
                containerStyle={styles.input}
                onChange={e => setLinkWhatsapp(e.nativeEvent.text) }
            />
            <Input 
                placeholder="Link facebook"
                containerStyle={styles.input}
                onChange={e => setLinkFacebook(e.nativeEvent.text) }
            />
            <Input 
                placeholder="Cedula"
                keyboardType="numeric"
                containerStyle={styles.input}
                onChange={e => setiIdentificationCard(e.nativeEvent.text)}
            />
            <Input 
                placeholder="Email"
                containerStyle={styles.input}
                onChange={e => setEmail(e.nativeEvent.text)}
            />
            <Input 
                placeholder="Pagina web"
                containerStyle={styles.input}
                onChange={e => setWebPage(e.nativeEvent.text)}
            />
            <DatePicker
                isVisible={isDatePickerVisible}
                mode="time"
                onConfirm={(time) => setTimeOpen(time)}
                onCancel={() => setDatePickerVisibility(false)}
            />
            <Input 
                placeholder="Hora Inicio"
                disabled={true}
                value={timeOpen ? String(timeOpen) : ""}
                containerStyle={styles.input}           
                rightIcon={{
                    type: "material-community",
                    name: "clock-outline",
                    color: timeOpen ? "#00a680" : "#c2c2c2",
                    onPress: () => setDatePickerVisibility(true)
                }}
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