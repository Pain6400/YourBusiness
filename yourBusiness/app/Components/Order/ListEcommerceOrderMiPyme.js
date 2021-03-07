import React, { useState } from "react";
import { StyleSheet, View, Text, FlatList, ActivityIndicator, TouchableOpacity } from "react-native";
import { Image, Icon } from "react-native-elements";
import { size, filter } from "lodash";
import { firebaseApp } from "../../Utils/firebase";
import * as firebase from "firebase/app";
import { FireSQL } from 'firesql';
import "firebase/firestore";

const db = firebase.firestore(firebaseApp);

export default function ListEcommerceOrder(props) {
    const { business, loading, navigation } = props;

    return (
        <View>
            {size(business) > 0 ? (
                <FlatList 
                   data={business}
                   renderItem={(item) => <BusinessRender item={item} navigation={navigation} />}
                   keyExtractor={(item, index) => index.toString()}
                   ListFooterComponent={<BusinessFooterList loading={loading} />}
                />
            ) : (
                <View style={styles.loadBusiness}>
                    <ActivityIndicator size="large" color="#00ff00" />
                    <Text>Cargando Ecommerces</Text>
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
                <Text>No hay mas tiendas</Text>
            </View>
        )
    }
}

function BusinessRender(props) {
    const fireSQL = new FireSQL(firebase.firestore(), { includeId: "id" });
    const { item, navigation } = props;
    const { images, name, address, description, id } = item.item;
    const imageItem = images[0];
    const [orderQuantity, setOrderQuantity] = useState(0);

    fireSQL.query(`SELECT * FROM Orders WHERE ecommerceId = '${id}'`)
    .then((doc) => {
        const data = filter(doc, (item) => { return item.status != "Close" } );
        setOrderQuantity(size(data))
    })

  const ecommerceInfo = () => {
        navigation.navigate("OrderProcesing", { id })
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
           <View style={styles.info}>
                <Text style={styles.businessName}>{name}</Text>
                <Text style={styles.businessAddress}>{address}</Text>
                <Text style={styles.businessDescription}>{description.substr(0, 60)}...</Text>
           </View>
           <View style={styles.order}>
               <Icon 
                    type="material-community"
                    name="basket"
                    color="#00a680"
                    size={30}
               />
               <Text>{orderQuantity}</Text>
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
   businessName: {
       fontWeight: "bold"
   },
   businessAddress: {
       paddingTop: 2,
       color: "grey"
   },
   businessDescription: {
        paddingTop: 2,
        color: "grey",
        width: 300
   },
   notFoundBusiness: {
       marginTop: 10,
       marginBottom: 20,
       alignItems: "center"
   },
   info: {
        width: "60%",
        marginRight: 5
   },
   order: {
       justifyContent: "center",
       alignItems: "center",
   }
});