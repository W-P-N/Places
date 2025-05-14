import { StyleSheet, View, Alert } from "react-native";
import OutlinedButton from './../ui/OutlinedButton';
import { Colors } from "../../constants/Colors";
import { getCurrentPositionAsync, useForegroundPermissions, PermissionStatus } from 'expo-location';  // This package needs developer to ask for permission.

export default function LocationPicker() {
    const [locationPermissionInfo, requestPermission] = useForegroundPermissions();

    async function verifiedPermissions() {
        // Function to get permissions (IOS)
        if(locationPermissionInfo.status === PermissionStatus.UNDETERMINED) {
            // If user hasn't been asked yet
            const permissionResponse = await requestPermission();

            return permissionResponse.granted;  // Returns true if permission granted, else false.
        };

        if(cameraPermissionInfo.status === PermissionStatus.DENIED) {
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
        console.log(location.coords.longitude, location.coords.latitude);
    };
    function pickOnMapsHandler() {};
    return (
        <View>
            <View style={styles.mapPreview}>

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
    }
})
