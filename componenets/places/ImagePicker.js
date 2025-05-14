import { Alert, Button, View } from "react-native";
import { launchCameraAsync, useCameraPermissions, PermissionStatus } from 'expo-image-picker';

export default function ImagePicker() {

    const [cameraPermissionInfo, requestPermission] = useCameraPermissions();

    async function verifyPermissions() {
        // Function to get permissions (IOS)
        if(cameraPermissionInfo.status === PermissionStatus.UNDETERMINED) {
            // If user hasn't been asked yet
            const permissionResponse = await requestPermission();

            return permissionResponse.granted;  // Returs true if permission granted, else false.
        };

        if(cameraPermissionInfo.status === PermissionStatus.DENIED) {
            // If user denied permission
            Alert.alert('Insufficient permissions', 'You need to grant camera permission to use this application.');
            return false;
        };

        return true;  // No permission issue
    };

    async function takeImageHandler() {
        const hasPermission = await verifyPermissions();
        if(!hasPermission) {
            return;  //Don't have permission to allow camera.
        }
        const image= await launchCameraAsync({
            allowsEditing: true,
            aspect: [16,9],
            quality: 0.5
        });
        console.log(image);
    }

    return (
        <View>
            <View>

            </View>
            <Button title="Take Image" onPress={takeImageHandler}/>
        </View>
    );
};

