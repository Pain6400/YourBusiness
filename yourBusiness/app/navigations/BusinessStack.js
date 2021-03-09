import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Business from "../screeens/Business/Business";
import EcommerceDetail from "../screeens/Business/EcommerceDetail";
import Products from "../screeens/Business/Products";
import ProductDetail from "../screeens/Business/ProductDetail";
import { Header, Icon } from "react-native-elements";
import OrdersToProcess from "../screeens/Order/OrdersToProcessFinalUser";
import OrderProcesing from "../screeens/Order/OrdersToProcessMyPyme";
import CompleteOrderEcommerce from "../screeens/Order/StepNotification";
import GestionPedidosMiPyme from "../Components/Order/GestionPedidosMiPyme";

const Stack = createStackNavigator();

export default function BusinessStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="business"
                component={Business}
                options={ ( { navigation }) => ({ header: () => <Header
                    centerComponent={{ text: 'Cuenta', style: { color: '#fff' } }}
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
                name="ecommerceDetail"
                component={EcommerceDetail}
                options={{ title: "E-commerce"}}
            />
            <Stack.Screen
                name="products"
                component={Products}
                options={{ title: "E-commerce"}}
            />
            <Stack.Screen
                name="productDetail"
                component={ProductDetail}
                options={{ title: "Detalle"}}
            />

            <Stack.Screen
                name="ordersToProcess"
                component={OrdersToProcess}
                options={{ title: "Lista de pedidos" }}
            />

            <Stack.Screen
                name="OrderProcesing"
                component={OrderProcesing}
                options={{ title: "Lista de pedidos" }}
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
        </Stack.Navigator>
    );
}