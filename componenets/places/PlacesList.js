import { FlatList, StyleSheet, View, Text } from "react-native";
import PlaceItem from "./PlaceItem";
import { Colors } from "../../constants/Colors";
import { useNavigation } from "@react-navigation/native";
import { removePlace } from "../../util/database";

export default function PlacesList({places, onDeleteComplete}) {
    const navigation = useNavigation();

    async function handleDeletePlace(id) {
        await removePlace(id);
        onDeleteComplete();
    }

    function selectPlaceHandler(id) {
        navigation.navigate('PlaceDetails', {
            placeId: id
        });
    };

    if(!places || places.length === 0) {
        return (
            <View style={styles.fallbackContainer}>
                <Text style={styles.fallbackText}>No places added yet.</Text>
            </View>
        );
    };
    
    return (
        <FlatList 
            data={places} 
            keyExtractor={
                (item) => item.id
            } 
            renderItem={
                (item) => <PlaceItem place={item} onSelect={selectPlaceHandler} onDelete={handleDeletePlace}/>
            }
            style={styles.list}
        />
    )
};

const styles = StyleSheet.create({
    list: {
        margin: 12,
    },
    fallbackContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    fallbackText: {
        fontSize: 16,
        color: Colors.primary200
    }
})
