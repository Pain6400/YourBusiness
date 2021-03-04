import React, { useState , useEffect } from "react";
import { StyleSheet, View, Text, FlatList, Image } from "react-native";
import { SearchBar, ListItem, Icon, Avatar } from "react-native-elements";
import { FireSQL } from 'firesql';
import firebase from "firebase/app";
import {Picker} from '@react-native-picker/picker';


export default function Search(props){
    const { navigation } = props;
    const [ search, setSearch ] = useState("");
    const [ type, setType ] = useState("");
    const [arrayData, setArratData] = useState([]);

    const fireSQL = new FireSQL(firebase.firestore(), { includeId: "id" })

    useEffect(() => {
        if(search)
        {
            if(type != "")
            {
                const column = type == "Ecommerce" ? "name" : "productName";
                fireSQL.query(`SELECT * FROM ${type} WHERE ${column} LIKE '${search}%'`)
                .then((response) => {
                    setArratData(response)
                });
            } else {
                setArratData([]);
            }
        } else {
            setArratData([]);
        }
    }, [search, type]);

    return(
        <View>
            <Picker
                selectedValue={type}
                style={{ height: 50, width: "100%" }}
                onValueChange={(item, index) => setType(item)}
                >
                <Picker.Item label="--Seleccione el tipo de busqueda--" value="" />
                <Picker.Item label="Empresa" value="Ecommerce" />
                <Picker.Item label="Producto" value="Product" />
            </Picker>
            <SearchBar
                placeholder={ type == "Ecommerce"? "Buscar empresa" : type == "Product" ? "Buscar producto": "Buscar" } 
                onChangeText={(e) => setSearch(e)}
                containerStyle={styles.searchBar}
                value={search}
            />
            {
                arrayData.length === 0 ? (
                    <NoFoundData />
                ) : (
                    <View>
                        {
                            type === "Ecommerce" ? (
                                <FlatList 
                                    data={arrayData}
                                    renderItem={(ecommerce) => <Ecommerces 
                                                                    ecommerce={ecommerce} 
                                                                    navigation={navigation} 
                                                                />}
                                    keyExtractor={(item, index) => index.toString()}
                                />
                            ) : (
                                <FlatList 
                                    data={arrayData}
                                    renderItem={(product) => <Products 
                                                                    product={product} 
                                                                    navigation={navigation} 
                                                                />}
                                    keyExtractor={(item, index) => index.toString()}
                                />
                            )
                        }
                    </View>
                )
            }
        </View>
    )
}

function Ecommerces(props){
    const { ecommerce, navigation } = props;
    const { name, images, id } = ecommerce.item;

    return(
        <View>
            <ListItem 
                key={id} 
                bottomDivider
                onPress={() => navigation.navigate("business", {
                    screen: "ecommerceDetail",
                    params: { id }
                })}
            >
                <Avatar source={images[0] ? { uri: images[0] } : require("../../../assets/Images/no-image.png")} />
                <ListItem.Content>
                    <ListItem.Title>{name}</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
            </ListItem>
        </View>
    )
}

function Products(props){
    const { product, navigation } = props;
    
    const { productName, images, id } = product.item;

    product.item.productId = product.item.id;
    
    const item = JSON.stringify(product.item);
    return(
        <View>
            <ListItem 
                key={id} 
                bottomDivider
                onPress={() => navigation.navigate("business", {
                    screen: "productDetail",
                    params: { item }
                })}
            >
                <Avatar source={images[0] ? { uri: images[0] } : require("../../../assets/Images/no-image.png")} />
                <ListItem.Content>
                    <ListItem.Title>{productName}</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
            </ListItem>
        </View>
    )
}

function NoFoundData() {
    return (
        <View style={{ flex: 1, alignItems: "center" }}>
            <Image 
                source={require("../../../assets/Images/not-found.png")}
                resizeMode="cover"
                style={{ width: 200, height: 200}}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    searchBar: {
        marginBottom: 20
    }
});