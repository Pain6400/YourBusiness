import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ShoppingCard from "../screeens/ShoppingCard/ShoppingCard";

const Stack = createStackNavigator();

export default function ShoppingCardStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="shopping-card"
                component={ShoppingCard}
                options={{ title: "Card"}}
            />
        </Stack.Navigator>
    );
}