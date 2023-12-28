import {
  setKey,
  setLanguage,
  setRegion,
  geocode,
  RequestType,
} from "react-geocode";

setKey(process.env.REACT_APP_GOOGLE_MAPS_API_KEY); // Your API key here.

// Set default response language (optional).
// This sets the default language for geocoding responses.
setLanguage("fr"); // Default language for responses.

// Set default response region (optional).
// This sets the default region for geocoding responses.
setRegion("fr"); // Default region for responses.

export const getGeocode = (type, value) => {
  switch (type) {
    case "address":
      return geocode(RequestType.ADDRESS, value);
    case "coord":
      return geocode(RequestType.COORDINATES, value);
    case "id":
      return geocode(RequestType.PLACE_ID, value);
    default:
      return geocode({ address: value });
  }
};
