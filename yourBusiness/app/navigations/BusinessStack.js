import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Business from "../screeens/Business/Business";
import EcommerceDetail from "../screeens/Business/EcommerceDetail";
import Products from "../screeens/Business/Products";

const Stack = createStackNavigator();

export default function BusinessStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="business"
                component={Business}
                options={{ title: "Tiendas"}}
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
        </Stack.Navigator>
    );
}