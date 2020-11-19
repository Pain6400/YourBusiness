import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Business from "../screeens/Business//Business";
import AddBusiness from "../screeens/Business/AddBusiness";


const Stack = createStackNavigator();

export default function BusinessStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="business"
                component={Business}
                options={{ title: "Negocios"}}
            />
            <Stack.Screen 
                name="add-business"
                component={AddBusiness}
                options={{ title: "Crear nuevo Negocio" }}
            />
        </Stack.Navigator>
    );
}