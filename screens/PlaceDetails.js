import { Image, ScrollView, StyleSheet, View, Text, Alert } from "react-native";
import OutlinedButton from "../componenets/ui/OutlinedButton";
import { Colors } from "../constants/Colors";
import { useEffect, useState } from "react";
import { fetchPlaceDetails } from "../util/database";

export default function PlaceDetails({route, navigation}) {
    const [fetchedPlace, setFetchedPlace] = useState();

    function showOnMapHandler() {
        navigation.navigate('Map', {
            initialLat: fetchedPlace.location.lat,
            initialLng: fetchedPlace.location.lng
        });
    };

    // console.log(route.params.placeId, 'yes'); //Working
    const selectedPlaceId = route.params.placeId;
    // console.log(selectedPlaceId, 'yes'); // Working

    useEffect(() => {
        async function getPlaceFromId() {
            const place = await fetchPlaceDetails(selectedPlaceId);
            if (!place) {
                Alert.alert("Place not found", "Could not find details for the selected place.");
                navigation.goBack();
                return;
            }
            setFetchedPlace(place);
            navigation.setOptions({
                title: place.title
            });
        }
        getPlaceFromId();
    }, [selectedPlaceId]);

    if(!fetchedPlace) {
        return (
            <View style={styles.fallbackStyle}>
                <Text style={styles.fallbackText}>
                    Loading place Data...
                </Text>
            </View>
        );
    };

    return (
        <ScrollView>
            <Image source={{uri: fetchedPlace.imageUri}} style={styles.image}/>
            <View style={styles.locationContainer}>
                <View style={styles.addressContainer}>
                    <Text style={styles.address}>{
                        fetchedPlace.address}
                    </Text>
                </View>
                <OutlinedButton icon={'map'} onPress={showOnMapHandler}>View On Map</OutlinedButton>
            </View>
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    fallbackStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    fallbackText: {
        color: Colors.primary100
    },
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
