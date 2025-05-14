import { useState } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker } from 'react-native-maps';

export default function Map() {
    const [selectedLocation, setSelectedLocation] = useState();
    const region = {
        latitude: 37.78,
        longitude: -122.43,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    };

    function selectLocationHandler(event) {
        const lat = event.nativeEvent.coordinate.latitude;
        const lng = event.nativeEvent.coordinate.longitude;
        setSelectedLocation({
            lat: lat,
            lng:lng
        });
    };

    return (
        <MapView initialRegion={region} style={styles.map} onPress={selectLocationHandler}>
            { selectedLocation && <Marker coordinate={{latitude: selectedLocation.lat, longitude: selectedLocation.lng}}/>}
        </MapView>
    );
};

const styles = StyleSheet.create({
    map: {
        flex: 1
    }
})
