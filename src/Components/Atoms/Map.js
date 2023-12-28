import React from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  StandaloneSearchBox,
} from "@react-google-maps/api";

const inputStyle = {
  boxSizing: `border-box`,
  border: `1px solid transparent`,
  width: `240px`,
  height: `32px`,
  padding: `0 12px`,
  borderRadius: `3px`,
  boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
  fontSize: `14px`,
  outline: `none`,
  textOverflow: `ellipses`,
  position: "absolute",
  top: "10px",
  right: "10px",
};

export default function Map() {
  const libraries = ["places"];
  const mapContainerStyle = {
    width: "100vw",
    height: "50vh",
  };
  const center = {
    lat: 7.2905715, // default latitude
    lng: 80.6337262, // default longitude
  };
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps</div>;
  }

  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={10}
        center={center}
      >
        <StandaloneSearchBox>
          <input
            type="text"
            placeholder="Customized your placeholder"
            style={inputStyle}
          />
        </StandaloneSearchBox>
        <Marker position={center} />
      </GoogleMap>
    </div>
  );
}
