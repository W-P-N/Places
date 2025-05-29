import PlaceForm from "../componenets/places/PlaceForm";

export default function AddPlace({navigation}) {
    function createPlaceHandler(place) {
        console.log(place);
        // Use device db or any other db
        navigation.navigate('AllPlaces', {
            place: place
        });
    };

    return (
        <PlaceForm onCreatePlace={createPlaceHandler}/>
    );
};
