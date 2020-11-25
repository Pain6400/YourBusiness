import { map, size } from "lodash";
import React, { useState } from "react";
import { StyleSheet, View, ScrollView, Image, Dimensions } from "react-native";
import { Input, Button } from "react-native-elements";
import UploadImages from "../../Components/UploadImages";
import GoogleMap from "../GoogleMap";
import DatePicker from "react-native-modal-datetime-picker";
import RNPickerSelect from 'react-native-picker-select';
import uuid from "random-uuid-v4";

import { firebaseApp } from "../../Utils/firebase";
import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";

const db = firebase.firestore(firebaseApp); 

const widthScreen = Dimensions.get("window").width;

export default function AddRestaurantForm(props) {

    const { setIsLoading, navigation, toastRef } = props;
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isDatePickerVisible2, setDatePickerVisibility2] = useState(false);

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
    const [Category, setCategory] = useState(0);

    const addBusiness = () => {
        console.log(timeOpen)
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
            Category === 0
        ) {
            toastRef.current.show("Todos los campos son obligatorios", 3000);
        } else if(size(imagesSelected) === 0) {
            toastRef.current.show("Debe de subir al menos una imagen", 3000);
        } else if(!locationBusiness) {
            toastRef.current.show("Debes de selecionar una localizacion en el mapa para el negocio", 3000);
        } else {
            setIsLoading(true);
            UplodadImagesStorage().then((response) => {

                db.collection("Ecommerce")
                    .add({
                        User: firebase.auth().currentUser.uid,
                        name: businessName,
                        address: businessAddress,
                        desciption: businessDescription,
                        phone: phone,
                        representativeName: representativeName,
                        location: locationBusiness,
                        linkWhatsapp: linkWhatsapp,
                        linkFcebook: linkFcebook,
                        identificationCard: identificationCard,
                        email: email,
                        webPage: webPage,
                        timeOpen: timeOpen,
                        timeClose: timeClose,
                        categoryId: Category,
                        images: response,
                        rating: 0,
                        ratingTotal: 0,
                        quantityVoting: 0,
                        createAt: new Date(),
                    }).then(() => {
                        setIsLoading(false);
                        navigation.navigate("business");
                    }).catch(() => {
                        setIsLoading(false);
                        toastRef.current.show("Error al crear tienda", 3000)
                    })
                
            })
        }
    }

    const UplodadImagesStorage = async () => {
        const imageBlod = [];

        await Promise.all(
            map(imagesSelected, async (image) => {
                const response = await fetch(image);
                const blod = await response.blob();
                const ref = firebase.storage().ref("E-comerces").child(uuid());
    
                await ref.put(blod).then(async (result) => {
                    await firebase
                            .storage()
                            .ref(`E-comerces/${result.metadata.name}`)
                            .getDownloadURL()
                            .then((imageUrl) => {
                                imageBlod.push(imageUrl)
                            });
                })
            })
        );

        return imageBlod;
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
                isDatePickerVisible2={isDatePickerVisible2}
                setDatePickerVisibility={setDatePickerVisibility}
                setDatePickerVisibility2={setDatePickerVisibility2}
                timeOpen={timeOpen}
                timeClose={timeClose}
                setCategory={setCategory}
                Category={Category}
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
        isDatePickerVisible2,
        setDatePickerVisibility2,
        timeOpen,
        timeClose,
        Category
    } = props;

    const saveTimeOpen = (time) => {

        if(time.getMinutes() > 10) {
            setTimeOpen(`${time.getHours()}:${time.getMinutes()}`); 
        } else {
            setTimeOpen(`${time.getHours()}:0${time.getMinutes()}`); 
        }
        setDatePickerVisibility(false);
    } 

    const saveTimeClose = (time) => {
        if(time.getMinutes() > 10) {
            setTimeClose(`${time.getHours()}:${time.getMinutes()}`); 
        } else {
            setTimeClose(`${time.getHours()}:0${time.getMinutes()}`); 
        }
        setDatePickerVisibility2(false);
    }

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
                onConfirm={(time) => saveTimeOpen(time)}
                onCancel={() => setDatePickerVisibility(false)}
            />

            <DatePicker
                isVisible={isDatePickerVisible2}
                mode="time"
                onConfirm={(time) => saveTimeClose(time)}
                onCancel={() => setDatePickerVisibility2(false)}
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
            <Input 
                placeholder="Hora Cierre"
                disabled={true}
                value={timeClose ? String(timeClose) : ""}
                containerStyle={styles.input}           
                rightIcon={{
                    type: "material-community",
                    name: "clock-outline",
                    color: timeClose ? "#00a680" : "#c2c2c2",
                    onPress: () => setDatePickerVisibility2(true)
                }}
            />
            <RNPickerSelect
                value={Category}
                onValueChange={(value) => setCategory(value)}
                items={Categories}
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