import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Business from "../screeens/Business//Business";

const Stack = createStackNavigator();

export default function BusinessStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="business"
                component={Business}
                options={{ title: "Negocios"}}
            />
        </Stack.Navigator>
    );
}