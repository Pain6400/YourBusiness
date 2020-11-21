import React, { useState } from "react";
import { StyleSheet, Text } from "react-native";
import Modal from "./Modal";


export default function GoogleMap(props) {
    const { isVisibleMap, setIsVisibleMap } = props;

    return (
        <Modal isVisible={isVisibleMap} setIsVisible={setIsVisibleMap}>
            <Text>Mapa</Text>
        </Modal>
    )
}