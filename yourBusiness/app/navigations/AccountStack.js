import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Account from "../screeens/Account/Account";
import Register from "../screeens/Account/Register";
import { Header, Icon } from "react-native-elements";
import OrdersToProcess from "../screeens/Order/OrdersToProcessFinalUser";
import OrderProcesing from "../screeens/Order/OrderProcesingMiPyme";
import CompleteOrderEcommerce from "../screeens/Order/CompleteOrderEcommerce";

const Stack = createStackNavigator();

export default function AccountStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="account"
                component={Account}
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
                name="register"
                component={Register}
                options={{ title: "Registro" }}
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
        </Stack.Navigator>
    );
}