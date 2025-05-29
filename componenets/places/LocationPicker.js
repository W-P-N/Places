import { StyleSheet, View, Alert, Image, Text } from "react-native";
import OutlinedButton from './../ui/OutlinedButton';
import { Colors } from "../../constants/Colors";
import { getCurrentPositionAsync, useForegroundPermissions, PermissionStatus } from 'expo-location';  // This package needs developer to ask for permission.
import { useEffect, useState } from "react";
import { getMapPreview } from "../../util/location";
import { useNavigation, useRoute, useIsFocused } from "@react-navigation/native";


export default function LocationPicker({onPickLocation}) {
    const navigation = useNavigation();
    const route = useRoute();
    const isFocused = useIsFocused();

    const [locationPermissionInfo, requestPermission] = useForegroundPermissions();
    const [pickedLocation, setPickedLocation] = useState();

    useEffect(() => {
        if (isFocused && route.params) {
            const mapPickedLocation = {
                lat: route.params.pickedLat, lng: route.params.pickedLng
            };
            setPickedLocation(mapPickedLocation);
        }
    }, [route, isFocused]);

    useEffect(() => {
        onPickLocation(pickedLocation);
    }, [pickedLocation, onPickLocation]);

    async function verifiedPermissions() {
        // Function to get permissions (IOS)
        if(locationPermissionInfo.status === PermissionStatus.UNDETERMINED) {
            // If user hasn't been asked yet
            const permissionResponse = await requestPermission();

            return permissionResponse.granted;  // Returns true if permission granted, else false.
        };

        if(locationPermissionInfo.status === PermissionStatus.DENIED) {
            // If user denied permission
            Alert.alert('Insufficient permissions', 'You need to grant location permission to use this application.');
            return false;
        };

        return true;  // No permission issue
    }
    async function getLocationHandler() {
        const hasPermission = await verifiedPermissions();

        if(!hasPermission) {
            return;
        }
        const location = await getCurrentPositionAsync();
        setPickedLocation({
            lat: location.coords.latitude,
            lng: location.coords.longitude
        });
    };
    let locationPreview = <Text>No Location Picked Yet</Text>;
    if(pickedLocation) {
        locationPreview = (
            <Image style={styles.mapPreviewImage} source={{uri: getMapPreview(pickedLocation.lat, pickedLocation.lng)}}/>
        );
    };
    
    function pickOnMapsHandler() {
        navigation.navigate('Map');
    };

    return (
        <View>
            <View style={styles.mapPreview}>
                {locationPreview}
            </View>
            <View style={styles.actions}>
                <OutlinedButton icon={'location'} onPress={getLocationHandler}>
                    Locate User
                </OutlinedButton>
                <OutlinedButton icon={'map'} onPress={pickOnMapsHandler}>
                    Pick on Map
                </OutlinedButton>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mapPreview: {
        width: '100%',
        height: 200,
        marginVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary100,
        borderRadius: 4
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    mapPreviewImage: {
        width: '100%',
        height: '100%',
        borderRadius: 4,
        overflow: 'hidden'
    }
})
