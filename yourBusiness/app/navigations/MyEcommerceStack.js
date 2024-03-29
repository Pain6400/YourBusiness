import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MyEcommerce from "../screeens/My-Ecommerce/MyEcommerce";
import AddBusiness from "../screeens/Business/AddBusiness";
import MyEcommerceDetail from "../screeens/My-Ecommerce/MyEcommerceDetail";
import EcommerceProducts from "../screeens/Products/EcommerceProducts";
import AddProduct from "../screeens/Products/AddProduct";
import EditProduct from "../screeens/Products/EditProduct";
import { Header, Icon } from "react-native-elements";
import OrdersToProcess from "../screeens/Order/OrdersToProcessFinalUser";
import OrderProcesing from "../screeens/Order/OrdersToProcessMyPyme";
import CompleteOrderEcommerce from "../screeens/Order/StepNotification";
import GestionPedidosMiPyme from "../Components/Order/GestionPedidosMiPyme";
import UserInfo from "../Components/Order/UserInfo";

const Stack = createStackNavigator();

export default function BusinessStack() {

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="myEcommerce"
                component={MyEcommerce}
                options={ ( { navigation }) => ({ header: () => <Header
                    centerComponent={{ text: 'Mis Tiendas', style: { color: '#fff' } }}
                    rightComponent={
                        <Icon 
                            type="material-community" 
                            name="bell" 
                            color="#fff"
                            onPress={() => navigation.navigate("ordersToProcess")} 
                        />
                    }
                    backgroundColor={"#00a680"}
                  />})}
            />
            <Stack.Screen 
                name="add-business"
                component={AddBusiness}
                options={{ title: "Crear E-commerce" }}
            />
            <Stack.Screen 
                name="myEcommerceDetail"
                component={MyEcommerceDetail}
                options={{ title: "E-commerce" }}
            />
            <Stack.Screen
                name="EcommerceProducts"
                component={EcommerceProducts}
                options={{ title: "Productos" }}
            />
            <Stack.Screen
                name="AddProduct"
                component={AddProduct}
                options={{ title: "Agregar producto" }}
            />
            <Stack.Screen
                name="editProduct"
                component={EditProduct}
                options={{ title: "Editar producto" }}
            />

            <Stack.Screen
                name="ordersToProcess"
                component={OrdersToProcess}
                options={{ title: "Lista de pedidos" }}
            />

            <Stack.Screen
                name="OrderProcesing"
                component={OrderProcesing}
                options={{ title: "Lista de pedidoss" }}
            />

            <Stack.Screen
                name="CompleteOrderEcommerce"
                component={CompleteOrderEcommerce}
                options={{ title: "Estado del pedido" }}
            />
            <Stack.Screen
                name="GestionPedidosMiPyme"
                component={GestionPedidosMiPyme}
                options={{ title: "Gestionar Pedidos" }}
            />

            <Stack.Screen
                name="UserInfo"
                component={UserInfo}
                options={{ title: "Informacion del cliente" }}
            />
        </Stack.Navigator>
    );
}