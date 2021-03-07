import React from "react";
import { StyleSheet, View, Text, FlatList, ActivityIndicator, TouchableOpacity } from "react-native";
import { Image } from "react-native-elements";
import { size } from "lodash";
import { firebaseApp } from "../../Utils/firebase";
import * as firebase from "firebase/app";
import "firebase/firestore";

const db = firebase.firestore(firebaseApp);

export default function ListOrders(props) {
    const { orders, loading, navigation } = props;
    return (
        <View>
            {size(orders) > 0 ? (
                <FlatList 
                   data={orders}
                   renderItem={(item) => <OrderRender item={item} navigation={navigation} />}
                   keyExtractor={(item, index) => index.toString()}
                   ListFooterComponent={<BusinessFooterList loading={loading} />}
                />
            ) : (
                <View style={styles.loadBusiness}>
                    <ActivityIndicator size="large" color="#00ff00" />
                    <Text>Cargando pedidos</Text>
                </View>
            )}
        </View>
    )
}

function BusinessFooterList(props) {
    const { loading } = props;

    if(loading) {
        return (
             <View style={styles.loadBusiness}>
                 <ActivityIndicator size="large" color="#fff" />
             </View>
        )
    } else {
        return (
            <View style={styles.notFoundBusiness}>
                <Text>No hay mas pedidos</Text>
            </View>
        )
    }
}

function OrderRender(props) {
    const { item, navigation } = props;
    const { images, productName, productPrice, productDescription, id, status } = item.item;
    const imageItem = images[0];
    const estado = status == "Open" ? "En proceso de aprobacion" : 
                    status == "processing" ? "Aprobado" :
                    status == "Paid" ? "Enviando" :
                    status == "Received" ? "Revibido"  : "";

  const ecommerceInfo = () => {
        navigation.navigate("CompleteOrderEcommerce", { product : item.item })
  }

  return(
      <TouchableOpacity
        onPress={ecommerceInfo}
      >
         <View style={styles.viewBusiness}>
           <View style={styles.viewImage}>
                <Image 
                    resizeMode="cover"
                    PlaceholderContent={<ActivityIndicator color="#fff" />}
                    source={
                        imageItem
                        ? { uri: imageItem }
                        : require("../../../assets/Images/no-image.png")
                    }
                    style={styles.imageBusiness}
                />
           </View>
           <View style={styles.descripcion}>
               <View>
               <Text style={styles.productName}>{productName}</Text>
                    <Text style={styles.productPrice}>{productPrice}</Text>
                    <Text style={styles.productDescription}>{productDescription.substr(0, 60)}...</Text>
               </View>
               <View>
                    <Text style={styles.productName}>{estado}</Text>
               </View>
           </View>
         </View>
      </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
   loadBusiness: {
       marginTop: 10,
       marginBottom: 10,
       alignItems: "center"
   },
   descripcion : {
        flexDirection : "column",
        alignItems: "center",
   },
   viewBusiness: {
       flexDirection: "row",
       margin: 10
   },
   viewImage: {
       marginRight: 15
   },
   imageBusiness: {
       width: 80,
       height: 80
   },
   productName: {
       fontWeight: "bold"
   },
   productPrice: {
       paddingTop: 2,
       color: "grey"
   },
   productDescription: {
        paddingTop: 2,
        color: "grey",
        width: 300
   },
   notFoundBusiness: {
       marginTop: 10,
       marginBottom: 20,
       alignItems: "center"
   }
});