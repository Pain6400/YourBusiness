import React, { useState, useEffect } from "react";
import MapView from "react-native-maps";
import openMap from 'react-native-open-maps';

export default function MapEcommerceDetail(props) {
    const { location, name, height } = props;
    
    const openAppMap = () => {
        openMap({
            latitude: location.latitude,
            longitude: location.longitude,
            Zoom: 19,
            query: name
        })
    }
    return (
        <MapView
            style={{ height: height, width: "100%"}}
            initialRegion={location}
            onPress={openAppMap}
        >
            <MapView.Marker
                coordinate={{
                    latitude: location.latitude,
                    longitude: location.longitude
                }}
            />
        </MapView>
    );

}