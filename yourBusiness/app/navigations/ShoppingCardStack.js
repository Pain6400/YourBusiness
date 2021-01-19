import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ShoppingCard from "../screeens/ShoppingCard/ShoppingCard";
import Order from "../screeens/Order/Oder";

const Stack = createStackNavigator();

export default function ShoppingCardStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="shopping-card"
                component={ShoppingCard}
                options={{ title: "Carrito"}}
            />

            <Stack.Screen
                name="Order"
                component={Order}
                options={{ title: "Pedido" }}
            />
        </Stack.Navigator>
    );
}