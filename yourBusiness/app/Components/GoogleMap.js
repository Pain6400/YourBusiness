import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "react-native-elements";
import Modal from "./Modal";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import MapView from "react-native-maps";

export default function GoogleMap(props) {
    const { isVisibleMap, setIsVisibleMap, toastRef, setLocationBusiness } = props;
    const [location, setLocation] = useState(null);


    useEffect(() => {
        (async () => {
            const resultPermissions = await Permissions.askAsync(Permissions.LOCATION);
            const statusPermissions = resultPermissions.permissions.location.status;
            if(statusPermissions !== "granted") {
                toastRef.current.show("Para crear un negocio debes de aceptar los permisos de localisacion", 3000)
            } else {
                const loc = await Location.getCurrentPositionAsync({});
                setLocation({
                    latitude: loc.coords.latitude,
                    longitude: loc.coords.longitude,
                    latitudeDelta: 0.001,
                    longitudeDelta: 0.001
                })
            }
        })()

    }, [])
    
    const saveCoordinate = () => {
        setLocationBusiness(location);
        toastRef.current.show("Localizacion guardada correctamente", 3000);
        setIsVisibleMap(false);
    };
    
    return (
        <Modal isVisible={isVisibleMap} setIsVisible={setIsVisibleMap}>
            <View>
                {location && (
                    <MapView
                        style={styles.mapStyle}
                        initialRegion={location}
                        showsUserLocation={true}
                        onRegionChange={(region) => setLocation(region) }
                    >
                        <MapView.Marker 
                            coordinate={{
                                latitude: location.latitude,
                                longitude: location.longitude
                            }}
                            draggable
                        />
                    </MapView>
                )}
                <View style={styles.viewMapBtn}>
                    <Button 
                        title="Guardar"
                        containerStyle={styles.btnSave}
                        buttonStyle={styles.btnSaveStyle}
                        onPress={saveCoordinate}
                    />
                    <Button 
                        title="Cancelar"
                        containerStyle={styles.btnCancel}
                        buttonStyle={styles.btnCancelStyle}
                        onPress={() => setIsVisibleMap(false)}
                    />
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    mapStyle: {
        width: "100%",
        height: 550
    },
    viewMapBtn: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 10
    },
    btnSave: {
        paddingRight: 5
    },
    btnSaveStyle: {
        backgroundColor: "#00a680"
    },
    btnCancel: {
        paddingLeft: 5
    },
    btnCancelStyle: {
        backgroundColor: "#a60d0d"
    }
})