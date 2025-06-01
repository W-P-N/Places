import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/Colors";
import IconButton from "../ui/IconButton";

export default function PlaceItem({place, onSelect, onDelete}) {
    return (
        <Pressable onPress={onSelect.bind(this, place.item.id)} style={({pressed}) => [styles.item, pressed && styles.pressed]}>
            <Image source={{uri: place.item.imageUri}} style={styles.image}/>
            <View style={styles.info}>
                <Text style={styles.title}>{place.item.title}</Text>
                <Text style={styles.address}>{place.item.address}</Text>
            </View>
            <IconButton icon={'trash-outline'} size={20} onPress={onDelete.bind(this, place.item.id)}/>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        borderRadius: 6,
        marginVertical: 12,
        backgroundColor: Colors.primary500,
        elevation: 2,
        shadowColor: 'black',
        shadowOpacity: 0.15,
        shadowOffset: { width: 1, height: 1 },
        shadowRadius: 2
    },
    pressed: {
        opacity: 0.8
    },
    image: {
        flex: 1,
        borderBottomLeftRadius: 4,
        borderTopLeftRadius: 4,
        height: 100
    },
    info: {
        flex: 2,
        padding: 12
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
        color: Colors.gray700
    },
    address: {
        fontSize: 12,
        color: Colors.gray700
    }
});
