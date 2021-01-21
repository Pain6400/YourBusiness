import React from "react";
import { StyleSheet, View, Text, FlatList, ActivityIndicator, TouchableOpacity } from "react-native";
import { Image } from "react-native-elements";
import { size } from "lodash";
import { firebaseApp } from "../../Utils/firebase";
import * as firebase from "firebase/app";
import "firebase/firestore";

const db = firebase.firestore(firebaseApp);

export default function ListBusiness(props) {
    const { business, loadNextBusiness, loading, navigation } = props;

    return (
        <View>
            {size(business) > 0 ? (
                <FlatList 
                   data={business}
                   renderItem={(item) => <BusinessRender item={item} navigation={navigation} />}
                   keyExtractor={(item, index) => index.toString()}
                   onEndReachedThreshold={0.5}
                   onEndReached={loadNextBusiness}
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
    const { item, navigation } = props;
    const { images, name, address, description, id } = item.item;
    const imageItem = images[0];
  const ecommerceInfo = () => {
        navigation.navigate("myEcommerceDetail", {
            id,
            name
        })
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
           <View>
                <Text style={styles.businessName}>{name}</Text>
                <Text style={styles.businessAddress}>{address}</Text>
                <Text style={styles.businessDescription}>{description.substr(0, 60)}...</Text>
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
   }
});