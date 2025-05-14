import { Alert, Button, Image, View, Text, StyleSheet } from "react-native";
import { launchCameraAsync, useCameraPermissions, PermissionStatus } from 'expo-image-picker';
import { useState } from "react";
import { Colors } from "../../constants/Colors";


export default function ImagePicker() {
    const [pickedImage, setPickedImage] = useState();

    const [cameraPermissionInfo, requestPermission] = useCameraPermissions();

    async function verifyPermissions() {
        // Function to get permissions (IOS)
        if(cameraPermissionInfo.status === PermissionStatus.UNDETERMINED) {
            // If user hasn't been asked yet
            const permissionResponse = await requestPermission();

            return permissionResponse.granted;  // Returns true if permission granted, else false.
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
            aspect: [1,1],
            quality: 0.5
        });
        setPickedImage(image.assets[0].uri);
    };

    let imagePreview = <Text>No Image Taken Yet</Text>;
    if(pickedImage) {
        imagePreview = <Image style={styles.image} source={{uri: pickedImage}}/>
    }

    return (
        <View>
            <View style={styles.imagePreview}>
                {imagePreview}
            </View>
            <Button title="Take Image" onPress={takeImageHandler}/>
        </View>
    );
};

const styles = StyleSheet.create({
    imagePreview: {
        width: '100%',
        height: 200,
        marginVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary100,
        borderRadius: 4
    },
    image: {
        width:'100%',
        height: '100%'
    }
})

