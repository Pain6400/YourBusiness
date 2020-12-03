import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MyEcommerce from "../screeens/My-Ecommerce/MyEcommerce";
import AddBusiness from "../screeens/Business/AddBusiness";
import MyEcommerceDetail from "../screeens/My-Ecommerce/MyEcommerceDetail";
import EcommerceProducts from "../screeens/Products/EcommerceProducts";
import AddProduct from "../screeens/Products/AddProduct";

const Stack = createStackNavigator();

export default function BusinessStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="myEcommerce"
                component={MyEcommerce}
                options={{ title: "Mi E-commerce"}}
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
        </Stack.Navigator>
    );
}