import React  from "react";
import { View, Text, Button } from "react-native";
import * as firebase from "firebase";

function UserLogger(){

    return(
        <View>
            <Text>UserLogger</Text>
            <Button title="Cerrar sesion" onPress={() => firebase.auth().signOut()} />
        </View>
    )
}

export default UserLogger;