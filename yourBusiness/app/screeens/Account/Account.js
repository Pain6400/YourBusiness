import React, { useState, useEffect }  from "react";
import { View, Text } from "react-native";
import * as firebase from "firebase";
import UserLogger from "./UserLogger";
import UserGuest from "./UserGuest";

function Account(){
    const [login, setLogin] = useState(null);
    
    useEffect(() => {
       firebase.auth().onAuthStateChanged((user) => {
           !user ? setLogin(false) : setLogin(true)
           console.log(user)
       })
    }, []);

    if(login === null) return <Text>Cargando...</Text>

    return login ? <UserLogger /> : <UserGuest />
}

export default Account;