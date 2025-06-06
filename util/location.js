export function getMapPreview(lat, lng) {
    const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:C%7C${lat},${lng}&key=${process.env.EXPO_PUBLIC_MAP_STATIC_API}`;
    return imagePreviewUrl
}

export async function getAddress(lat, lng) {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.EXPO_PUBLIC_GEOCODE_API}`; 
    const resp = await fetch(url);
    
    if(!resp.ok) {
        throw new Error('Failed to fetch address!');
    }

    const data = await resp.json();
    const address = data.results[0].formatted_address;
    return address;
}
