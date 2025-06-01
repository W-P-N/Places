import { useEffect, useState } from "react";
import PlacesList from "../componenets/places/PlacesList";
import { useIsFocused } from "@react-navigation/native";
import { fetchPlaces } from "../util/database";

export default function AllPlaces({route}) {
    const [loadedPlaces, setLoadedPlaces] = useState([]);
    const isFocused = useIsFocused();

    async function loadPlaces() {
        const places = await fetchPlaces();
        setLoadedPlaces(places);
    }

    useEffect(() => {
        if(isFocused) {
            loadPlaces();
        };

    }, [isFocused]);

    return (
        <>
            <PlacesList places={loadedPlaces} onDeleteComplete={loadPlaces}/>
        </>
    );
};

