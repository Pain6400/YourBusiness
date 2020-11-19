import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements'

//------Stacks------//
import BusinessStack from "./BusinessStack";
import FavoritesStack from "./FavoritesStack";
import TopBusinessStack from "./TopBusinessStack";
import SearchStack from "./SearchStack";
import AccountStack from "./AccountStack";

//------Stacks------//

const Tab = createBottomTabNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="business"
        tabBarOptions={{
            inactiveTintColor: "#646464",
            activeTintColor: "#00a680"
        }}
        screenOptions={({ route }) => ({
            tabBarIcon: ({ color }) => screenOptions(route, color),
        })}
      >
        <Tab.Screen 
            name="business" 
            component={BusinessStack}
            options={{ title: "Negocios"}}
        />
        <Tab.Screen 
            name="favorites" 
            component={FavoritesStack} 
            options={{ title: "Favoritos"}}
        />
        <Tab.Screen 
            name="top-business" 
            component={TopBusinessStack}
            options={{ title: "Top 5"}}
         />  
        <Tab.Screen 
            name="search" 
            component={SearchStack}
            options={{ title: "Buscar"}}
         />   
        <Tab.Screen 
            name="account" 
            component={AccountStack} 
            options={{ title: "Cuenta"}}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

function screenOptions(route, color) {
    let iconName;

    switch (route.name) {
        case "business":
                iconName = "store"
            break;
        case "favorites":
                iconName = "heart-outline"
            break;
        case "top-business":
            iconName = "star-outline"
            break;
        case "search":
            iconName = "magnify"
            break;
        case "account":
            iconName = "account"
            break;
        default:
            break;
    }

    return <Icon type="material-community" name={iconName} size={22} color={color} />
}