import React, { useEffect, useState, useRef, useCallback } from "react";
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, TextInput, FlatList  } from "react-native";
import Loading from "../../Components/Loading";
import { Icon, Button, Image, } from 'react-native-elements';
import StepIndicator from 'react-native-step-indicator';
import { firebaseApp } from "../../Utils/firebase";
import Toast from "react-native-easy-toast";
import * as firebase from "firebase/app";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);

export default function CompleteOrderEcommerce(props) {
    const toastRef = useRef();
    const { navigation } = props;
    const { product } = props.route.params;

    const { cartId, productId, productName, images, productPrice, ecommerceId, quantity, toastRefCart, status } = product;
    const [shoopingCart, setShoppingCart] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const viewabilityConfig = useRef({ itemVisiblePercentThreshold: 40 }).current;

    const labels = ["En proceso de aprobacion","Aprobado","Enviando","Recibido"];
                

    console.log(currentPage, status)
    useEffect(() => {
        if (status === "Open") {
            setCurrentPage(0);
        } else if (status === "processing") {
            setCurrentPage(1);
        } else if (status === "Paid") {
            setCurrentPage(2);
        } else if (status === "received") {
            setCurrentPage(3)
        }

        db.collection("ShoppingCard")
            .doc(product.cartId)
            .get()
            .then((response) => {
                const data = response.data();
                setShoppingCart(data)
            })
    }, [])

    const onViewableItemsChanged = useCallback(({ viewableItems }) => {
        const visibleItemsCount = viewableItems.length;
        if (visibleItemsCount !== 0) {
          setCurrentPage(viewableItems[visibleItemsCount - 1].index);
        }
      }, []);

    const renderPage = (item) => {
        return (
          <View style={styles.rowItem}>
            <Text style={styles.title}>{item.item}</Text>
            <Text style={styles.body}>Test</Text>
          </View>
        );
      };

    return (
        <View style={styles.container}>
            <View style={styles.stepIndicator}>
                <StepIndicator
                    customStyles={stepIndicatorStyles}
                    stepCount={4}
                    direction="vertical"
                    currentPosition={currentPage}
                    labels={labels.map((item) => item.title)}
                />
            </View>
            <FlatList
                style={{ flexGrow: 1 }}
                data={labels}
                renderItem={(item) => renderPage(item)}
                //onViewableItemsChanged={onViewableItemsChanged}
                viewabilityConfig={viewabilityConfig}
                keyExtractor={(item, index) => index.toString()}
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
      marginVertical: 50,
      paddingHorizontal: 20,
    },
    rowItem: {
      flex: 3,
      paddingVertical: 20,
    },
    title: {
      flex: 1,
      fontSize: 20,
      color: '#333333',
      paddingVertical: 16,
      fontWeight: '600',
    },
    body: {
      flex: 1,
      fontSize: 15,
      color: '#606060',
      lineHeight: 24,
      marginRight: 8,
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