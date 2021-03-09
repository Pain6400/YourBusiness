import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Search from "../screeens/Search/Search";
import { Header, Icon } from "react-native-elements";
import OrdersToProcess from "../screeens/Order/OrdersToProcessFinalUser";
import OrderProcesing from "../screeens/Order/OrdersToProcessMyPyme";
import CompleteOrderEcommerce from "../screeens/Order/StepNotification";
import GestionPedidosMiPyme from "../Components/Order/GestionPedidosMiPyme";

const Stack = createStackNavigator();

export default function SearchStack() {

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="search"
                component={Search}
                options={ ( { navigation }) => ({ header: () => <Header
                    centerComponent={{ text: 'Buscar', style: { color: '#fff' } }}
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
                name="ordersToProcess"
                component={OrdersToProcess}
                options={{ title: "Lista de pedidos"}}
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

            <Stack.Screen
                name="GestionPedidosMiPyme"
                component={GestionPedidosMiPyme}
                options={{ title: "Gestionar Pedidos" }}
            />
        </Stack.Navigator>
    );
}