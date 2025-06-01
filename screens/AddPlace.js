import PlaceForm from "../componenets/places/PlaceForm";
import { insertPlace } from "../util/database";

export default function AddPlace({navigation}) {
    async function createPlaceHandler(place) {
        await insertPlace(place);
        navigation.navigate('AllPlaces');
        // console.log(place);
    };

    return (
        <PlaceForm onCreatePlace={createPlaceHandler}/>
    );
};
