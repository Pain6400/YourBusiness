import React, { useState, useEffect }  from "react";
import * as firebase from "firebase";
import UserLogger from "./UserLogger";
import UserGuest from "./UserGuest";
import Loading from "../../Components/Loading"; 

export default function Account(props) {
    const { navigation } = props; 
    const [login, setLogin] = useState(null);
    
    useEffect(() => {
       firebase.auth().onAuthStateChanged((user) => {
           !user ? setLogin(false) : setLogin(true)
       })
    }, []);


    if(login === null) return <Loading isVisible={true} text="Cargando..." />

    return login ? <UserLogger /> : <UserGuest navigation={navigation} />
}
