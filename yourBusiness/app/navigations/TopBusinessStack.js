import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TopBusiness from "../screeens/TopBusiness";

const Stack = createStackNavigator();

export default function TopBusinessStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="top-Business"
                component={TopBusiness}
                options={{ title: "Top"}}
            />
        </Stack.Navigator>
    );
}