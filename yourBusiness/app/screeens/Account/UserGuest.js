import React  from "react";
import { View, Text } from "react-native";
import Login from "./Login";

function UserGuest(props){    
    const { navigation } = props; 
    return <Login navigation={navigation} />
}

export default UserGuest;