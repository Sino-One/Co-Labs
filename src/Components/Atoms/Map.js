import React, { useContext, useEffect, useState } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  StandaloneSearchBox,
  InfoWindow,
} from "@react-google-maps/api";
import { fromAddress } from "react-geocode";
import Slider from "@mui/material/Slider";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Annuaire from "./AnnuaireStructure";
import { StructuresContext } from "../../store/StructuresReducer";
import { Typography } from "@mui/material";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import { publicAccType } from "../Pages/CreateProject";
import { UserContext } from "../../store/UserReducer";
import AnnuaireStructure from "./AnnuaireStructure";
import AnnuaireProjet from "./AnnuaireProjet";

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
  const { user } = useContext(UserContext);
  const [userStructure, setUserStructure] = useState(null); // La structure de l'utilisateur
  const [selectedCenter, setSelectedCenter] = useState(null);
  const [secteurStructure, setSecteurStructure] = useState("Social");
  const [filter, setFilter] = useState("structure");
  const [publicAcc, setPublicAcc] = useState(publicAccType.enfant);

  useEffect(() => {
    let newMarkers = [];
    if (structures) {
      structures.map((structure) =>
        fromAddress(structure.adresse).then((response) => {
          const { lat, lng } = response.results[0].geometry.location;
          if (filter === "structure") {
            if (structure._id === user.structure)
              setUserStructure({ ...structure, lat: lat, lng: lng });
            newMarkers.push({ ...structure, lat: lat, lng: lng });
          } else if (filter === "projet") {
            if (structure?.projets?.length > 0) {
              newMarkers.push({ ...structure, lat: lat, lng: lng });
            }
          }
          setMarkers(newMarkers);
        })
      );
    }
  }, [structures, filter]);

  useEffect(() => {
    if (markers.length > 0) {
      setCenter({
        lat: userStructure.lat,
        lng: userStructure.lng,
      });
    }
  }, [userStructure]);

  useEffect(() => {
    // Filtrer les marqueurs par distance
    async function fetchFilteredMarkers() {
      await setTimeout(() => {
        let filtered = markers.filter((structure) => {
          const distance = calculateDistance(center, {
            lat: structure.lat,
            lng: structure.lng,
          });
          return distance <= radius;
        });
        filtered = filtered.filter((structure) => {
          if (
            structure.secteur === secteurStructure ||
            secteurStructure === "Mixte"
          ) {
            return structure;
          }
        });
        filtered = filtered.filter((structure) => {
          if (structure.public === publicAcc) {
            return structure;
          }
        });
        setFilteredMarkers(filtered);
      }, 100);
    }
    fetchFilteredMarkers(markers);
  }, [center, radius, markers, filter, secteurStructure, publicAcc]);

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps</div>;
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          margin: "24px 24px 0 24px",
        }}
      >
        <ButtonGroup variant="outlined" aria-label="outlined button group">
          <Button
            onClick={() => setFilter("structure")}
            style={{
              backgroundColor: filter === "structure" ? "lightgreen" : "",
              width: "50%",
            }}
          >
            Structures
          </Button>
          <Button
            onClick={() => setFilter("projet")}
            style={{
              backgroundColor: filter === "projet" ? "lightgreen" : "",
              width: "50%",
            }}
          >
            Projets
          </Button>
        </ButtonGroup>
        <div
          style={{ display: "block", width: "25%", margin: "24px 24px 0 24px" }}
        >
          <Typography variant="body1" component="div">
            Rayon de recherche (km)
          </Typography>
          <Slider
            aria-label="Rayon de recherche"
            defaultValue={30}
            valueLabelDisplay="auto"
            step={5}
            marks
            min={0}
            max={110}
            onChange={(e, v) => setRadius(v)}
          />
        </div>
        <div style={{ display: "block" }}>
          <Typography variant="body1" component="div">
            Secteur d'activité
          </Typography>
          <Select
            style={{ margin: 24, width: "180px" }}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={secteurStructure}
            label="Secteur d'activité"
            onChange={(e) => setSecteurStructure(e.target.value)}
          >
            <MenuItem value={"Social"}>Social</MenuItem>
            <MenuItem value={"Medico-social"}>Médico-social</MenuItem>
            <MenuItem value={"Mixte"}>Mixte</MenuItem>
          </Select>
        </div>
        <div style={{ display: "block" }}>
          <Typography variant="body1" component="div">
            Public accueillis
          </Typography>
          <Select
            style={{ width: "300px" }}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={publicAcc}
            label="Public accueillis"
            onChange={(e) => setPublicAcc(e.target.value)}
          >
            {Object.keys(publicAccType).map((key) => (
              <MenuItem value={publicAccType[key]} key={key}>
                {publicAccType[key]}
              </MenuItem>
            ))}
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
      {filter === "structure" || filter === "projet" ? (
        <AnnuaireStructure data={filteredMarkers} />
      ) : (
        <AnnuaireProjet></AnnuaireProjet>
      )}
    </div>
  );
}
