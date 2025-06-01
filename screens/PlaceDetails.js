import { Image, ScrollView, StyleSheet, View, Text } from "react-native";
import OutlinedButton from "../componenets/ui/OutlinedButton";
import { Colors } from "../constants/Colors";
import { useEffect } from "react";
import { fetchPlaceDetails } from "../util/database";

export default function PlaceDetails({route}) {
    function showOnMapHandler() {

    };

    const selectedPlaceId = route.params.placeId;

    useEffect(() => {
        async function getPlaceFromId() {
            const placeDetails = await fetchPlaceDetails(selectedPlaceId);
            console.log(placeDetails);
        }
    }, [selectedPlaceId]);

    return (
        <ScrollView>
            <Image style={styles.image}/>
            <View style={styles.locationContainer}>
                <View style={styles.addressContainer}>
                    <Text style={styles.address}>ADDRESS</Text>
                </View>
                <OutlinedButton icon={'map'} onPress={showOnMapHandler}>View On Map</OutlinedButton>
            </View>
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    image: {
        height: '35%',
        minHeight: 300,
        width: '100%'
    },
    locationContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    addressContainer: {
        padding: 20
    },
    address: {
        color: Colors.primary500,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16
    }
})
