
const axios = require("axios");
const API_KEY = "AIzaSyBxIlIfSS41tQZrBWuSTgGgj7f4_y8ab0o";

// função pra converter endereço em coordenada
async function getCoordinates(address) {
    try {
        const response = await axios.get(
            "https://maps.googleapis.com/maps/api/geocode/json",
            {
                params: {
                    address,
                    key: API_KEY
                }
            }
        );

        if (response.data.status !== "OK") {
            console.log("Erro da API:", response.data.status);
            return null;
        }

        const location = response.data.results[0].geometry.location;

        return {
            lat: location.lat,
            lng: location.lng
        };

    } catch (error) {
        console.error(error);
        return null;
    }
}

module.exports = { getCoordinates };