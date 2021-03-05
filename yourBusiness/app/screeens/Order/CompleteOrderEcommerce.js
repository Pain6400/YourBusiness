import React, { useEffect, useState, useRef, useCallback } from "react";
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, TextInput, FlatList  } from "react-native";
import Loading from "../../Components/Loading";
import { Icon, Button, Image, } from 'react-native-elements';
import StepIndicator from 'react-native-step-indicator';
import { firebaseApp } from "../../Utils/firebase";
import Toast from "react-native-easy-toast";
import RenderPage from "../../Components/Order/RenderPageOrderFinalUser"
import * as firebase from "firebase/app";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);

export default function CompleteOrderEcommerce(props) {
    const toastRef = useRef();
    const { navigation } = props;
    const { product } = props.route.params;
    const { status } = product;

    const [shoopingCart, setShoppingCart] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [titlePage, setTitlePage] = useState("");

    useEffect(() => {
        if (status === "Open") {
            setCurrentPage(1);
            setTitlePage("En proceso de aprobacion")
        } else if (status === "processing") {
            setCurrentPage(1);
            setTitlePage("Aprobado")
        } else if (status === "Paid") {
            setCurrentPage(2);
            setTitlePage("Enviando")
        } else if (status === "received") {
            setCurrentPage(3)
            setTitlePage("Recibido")
        }

        db.collection("ShoppingCard")
            .doc(product.cartId)
            .get()
            .then((response) => {
                const data = response.data();
                setShoppingCart(data)
            })
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.stepIndicator}>
                <StepIndicator
                    customStyles={stepIndicatorStyles}
                    stepCount={4}
                    direction="vertical"
                    currentPosition={currentPage}
                    //labels={labels.map((item) => item.title)}
                />
            </View>

            <RenderPage 
                titlePage={titlePage} 
                product={product} 
                shoopingCart={shoopingCart} 
                currentPage={currentPage}
            />
        </View>
    );
    
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: '#ffffff',
    },
    stepIndicator: {
      marginVertical: 10,
      paddingHorizontal: 20,
    },
  });

const stepIndicatorStyles = {
    stepIndicatorSize: 30,
    currentStepIndicatorSize: 40,
    separatorStrokeWidth: 3,
    currentStepStrokeWidth: 5,
    stepStrokeCurrentColor: '#fe7013',
    separatorFinishedColor: '#fe7013',
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: '#fe7013',
    stepIndicatorUnFinishedColor: '#aaaaaa',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 15,
    currentStepIndicatorLabelFontSize: 15,
    stepIndicatorLabelCurrentColor: '#000000',
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: 'rgba(255,255,255,0.5)',
    labelColor: '#666666',
    labelSize: 15,
    currentStepLabelColor: '#fe7013',
  };