import React from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

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
    googleMapsApiKey: "AIzaSyDOzx3OEjfNPUYKXwdjB5xdWbO--MVw0po",
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
        <Marker position={center} />
      </GoogleMap>
    </div>
  );
}
