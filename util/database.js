import * as SQLite from 'expo-sqlite';
import { Place } from '../models/place';

const database = SQLite.openDatabaseSync('places.db');

export async function init() {
    database.execAsync(
        `
            CREATE TABLE IF NOT EXISTS places (
                id INTEGER PRIMARY KEY NOT NULL,
                title TEXT NOT NULL,
                imageUri TEXT,
                address TEXT NOT NULL,
                lat REAL NOT NULL,
                lng REAL NOT NULL
            )    
        `
    );
};

export async function insertPlace(place) {
    try {
        const result = await database.runAsync(
            `INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?)`,
            [
                place.title,
                place.imageUri,
                place.address,
                place.location.lat,
                place.location.lng
            ]
        );

        const id = result.lastInsertRowId;

        return new Place(
            place.title,
            place.imageUri,
            {
                address: place.address,
                lat: place.location.lat,
                lng: place.location.lng
            },
            id // Now attach the correct numeric id
        );
    } catch (error) {
        console.error('Error inserting place:', error);
        throw error;
    }
};

export async function fetchPlaces() {
    try {
        const result = await database.getAllAsync(`SELECT * FROM places`);
        const places = [];

        for (const dp of result) {
            places.push(
                new Place(
                    dp.title,
                    dp.imageUri,
                    {
                        address: dp.address,
                        lat: dp.lat,
                        lng: dp.lng
                    },
                    dp.id
                )
            );
        }

        // console.log(places);
        return places;
    } catch (error) {
        console.error("Error fetching places from the database:", error);
        return []; // Return an empty array or handle accordingly
    }
};

export async function fetchPlaceDetails(id) {
    try {
        console.log('Looking for place with id:', id);

        const dbPlace = await database.getFirstAsync(
            `
                SELECT * FROM places WHERE id = ?
            `,
            [id]
        );

        if (!dbPlace) {
            console.warn(`No place found with id ${id}`);
            return null; // or throw an error, depending on your app's needs
        }
    
        const place = new Place(
            dbPlace.title,
            dbPlace.imageUri,
            {
                lat: dbPlace.lat,
                lng: dbPlace.lng,
                address: dbPlace.address
            },
            dbPlace.id
        );
    
        return place;
    } catch(e) {
        console.log('Error occured', e);
    }
};

export async function removePlace(id) {
    // const rows = await database.getAllAsync(`SELECT * FROM places`);
    // console.log("Current Places Table:", rows);
    try { 
        const toDeletePlace = await database.runAsync(
            `
                DELETE FROM places WHERE id = ?
            `,
            [id]
        );
        console.log(toDeletePlace.changes, toDeletePlace.lastInsertRowId);
    } catch (e) {
        console.log(e);
    } 
}

