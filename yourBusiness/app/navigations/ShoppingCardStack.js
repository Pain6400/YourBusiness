import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ShoppingCard from "../screeens/ShoppingCard/ShoppingCard";
import Order from "../screeens/Order/Oder";
import { Header, Icon } from "react-native-elements";
import OrdersToProcess from "../screeens/Order/OrdersToProcess";
import OrderProcesing from "../screeens/Order/OrderProcesing";

const Stack = createStackNavigator();

export default function ShoppingCardStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="shopping-card"
                component={ShoppingCard}
                options={ ( { navigation }) => ({ header: () => <Header
                    centerComponent={{ text: 'Carrito', style: { color: '#fff' } }}
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
                name="Order"
                component={Order}
                onPress={{ title: "Pedido"}}
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
        </Stack.Navigator>
    );
}