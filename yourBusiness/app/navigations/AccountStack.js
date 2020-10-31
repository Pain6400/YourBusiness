import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Account from "../screeens/Account/Account";
import Register from "../screeens/Account/Register";

const Stack = createStackNavigator();

export default function AccountStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="account"
                component={Account}
                options={{ title: "Cuenta"}}
            />

            <Stack.Screen
                name="register"
                component={Register}
                options={{ title: "Registro" }}
            />
        </Stack.Navigator>
    );
}