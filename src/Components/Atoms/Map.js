import React, { useContext, useEffect, useState } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  StandaloneSearchBox,
  InfoWindow,
} from "@react-google-maps/api";
import * as Api from "../../Utils/Api";
import { getGeocode } from "../../Utils/GeoCode";
import { fromAddress } from "react-geocode";
import Slider from "@mui/material/Slider";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Annuaire from "./Annuaire";
import { StructuresContext } from "../../store/StructuresReducer";

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
  right: "75px",
};

const calculateDistance = (point1, point2) => {
  const R = 6371; // Rayon de la Terre en kilomètres
  const lat1 = toRadians(point1.lat);
  const lon1 = toRadians(point1.lng);
  const lat2 = toRadians(point2.lat);
  const lon2 = toRadians(point2.lng);

  const dLat = lat2 - lat1;
  const dLon = lon2 - lon1;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c; // Distance en kilomètres
  return distance;
};

const toRadians = (degrees) => {
  return (degrees * Math.PI) / 180;
};

const libraries = ["places"];

export default function Map() {
  const mapContainerStyle = {
    width: "100vw",
    height: "50vh",
    marginTop: "24px",
  };
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });
  const [markers, setMarkers] = useState([]);
  const [filteredMarkers, setFilteredMarkers] = useState([]); // Les marqueurs filtrés
  const [center, setCenter] = useState({ lat: 0, lng: 0 }); // Le point central
  const [radius, setRadius] = useState(30); // Le rayon de recherche
  const { structures } = useContext(StructuresContext);
  const [selectedCenter, setSelectedCenter] = useState(null);

  useEffect(() => {
    let newMarkers = [];
    if (structures) {
      structures.map((structure) =>
        fromAddress(structure.adresse).then((response) => {
          const { lat, lng } = response.results[0].geometry.location;
          newMarkers.push({ ...structure, lat: lat, lng: lng });
          setMarkers(newMarkers);
        })
      );
    }
  }, [structures]);

  console.log(structures);

  useEffect(() => {
    if (markers.length > 0) {
      setCenter({
        lat: markers[0].lat,
        lng: markers[0].lng,
      });
    }
    console.log(markers);
  }, [markers]);

  useEffect(() => {
    // Filtrer les marqueurs par distance
    const filtered = markers.filter((structure) => {
      const distance = calculateDistance(center, {
        lat: structure.lat,
        lng: structure.lng,
      });
      return distance <= radius;
    });
    setFilteredMarkers(filtered);
  }, [center, radius]);

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps</div>;
  }

  return (
    <div>
      <div style={{ display: "flex", margin: "24px 24px 0 24px" }}>
        <Slider
          aria-label="Rayon de recherche"
          defaultValue={30}
          valueLabelDisplay="auto"
          step={5}
          marks
          min={0}
          max={110}
          onChange={(e, v) => setRadius(v)}
          style={{ width: "50%", margin: "auto" }}
        />
        <div style={{ display: "block" }}>
          <InputLabel id="demo-simple-select-label">
            Public accueillis
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={10}
            label="Public accueillis"
            onChange={() => {}}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </div>
        <div style={{ display: "block" }}>
          <InputLabel id="demo-simple-select-label">
            Type de structure
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={10}
            label="Type de structure"
            onChange={() => {}}
          >
            <MenuItem value={10}>Social</MenuItem>
            <MenuItem value={20}>Médico-social</MenuItem>
            <MenuItem value={30}>Mixte</MenuItem>
          </Select>
        </div>
      </div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={10}
        center={center}
      >
        <StandaloneSearchBox onPlacesChanged={(e) => console.log(e)}>
          <input
            type="text"
            placeholder="Rechercher une structure"
            style={inputStyle}
            onChange={(e) => console.log(e)}
          />
        </StandaloneSearchBox>
        {filteredMarkers.map((marker) => (
          <Marker
            key={marker._id}
            position={{ lat: marker.lat, lng: marker.lng }}
            onClick={() => {
              setSelectedCenter(marker);
            }}
          />
        ))}
        {selectedCenter && (
          <InfoWindow
            onCloseClick={() => {
              setSelectedCenter(null);
            }}
            position={{ lat: selectedCenter.lat, lng: selectedCenter.lng }}
          >
            <div>
              <h2>{selectedCenter.nom}</h2>
              <p>{selectedCenter.adresse}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
      <Annuaire data={filteredMarkers} />
    </div>
  );
}
