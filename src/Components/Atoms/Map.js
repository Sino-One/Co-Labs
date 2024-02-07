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
import { StructuresContext } from "../../store/StructuresReducer";
import { Typography } from "@mui/material";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import { publicAccType } from "../Pages/CreateProject";
import { UserContext } from "../../store/UserReducer";
import AnnuaireStructure from "./AnnuaireStructure";
import AnnuaireProjet from "./AnnuaireProjet";
import StructureService from "../../Services/StructureService";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const mapContainerStyle = {
    width: "90vw",
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
  const { structures, setStructures } = useContext(StructuresContext);
  const { user } = useContext(UserContext);
  const [userStructure, setUserStructure] = useState(null); // La structure de l'utilisateur
  const [selectedCenter, setSelectedCenter] = useState(null);
  const [secteurStructure, setSecteurStructure] = useState("Mixte");
  const [filter, setFilter] = useState("structure");
  const [publicAcc, setPublicAcc] = useState(publicAccType.enfant);
  const [tags, setTags] = useState({
    social: false,
    culturel: false,
    sportif: false,
    nature: false,
    mediation: false,
    animation: false,
    sante: false,
  });

  useEffect(() => {
    async function fetchStructures() {
      await StructureService.getAllStructures().then((structures) => {
        setStructures(structures);
      });
    }
    fetchStructures();
  }, []);

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
            secteurStructure === "Mixte" ||
            structure.secteur === "Mixte"
          ) {
            return structure;
          }
        });
        filtered = filtered.filter((structure) => {
          if (structure.public === publicAcc) {
            return structure;
          }
        });
        filtered = filtered.filter((structure) => {
          if (filter === "projet") {
            // Vérifier si la structure contient au moins un projet qui correspond aux tags
            const hasMatchingProjects = structure.projets.some((projet) => {
              // Si aucun tag n'est sélectionné, retourner true
              if (
                !tags.social &&
                !tags.culturel &&
                !tags.sportif &&
                !tags.nature &&
                !tags.mediation &&
                !tags.animation &&
                !tags.sante
              ) {
                return true;
              }
              // Sinon, vérifier si au moins un tag correspond
              return (
                (tags.social && projet.tags.social) ||
                (tags.culturel && projet.tags.culturel) ||
                (tags.sportif && projet.tags.sportif) ||
                (tags.nature && projet.tags.nature) ||
                (tags.mediation && projet.tags.mediation) ||
                (tags.animation && projet.tags.animation) ||
                (tags.sante && projet.tags.sante)
              );
            });

            // Retourner true si la structure a au moins un projet qui correspond aux tags
            return hasMatchingProjects;
          } else {
            // Retourner toutes les structures si le filtre n'est pas "projet"
            return true;
          }
        });
        setFilteredMarkers(filtered);
      }, 100);
    }
    fetchFilteredMarkers(markers);
  }, [center, radius, markers, filter, secteurStructure, publicAcc, tags]);

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
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        }}
      >
        <ButtonGroup
          variant="outlined"
          aria-label="outlined button group"
          style={{ margin: "16px 24px 0 24px" }}
        >
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
        <div style={{ margin: "16px 24px 0 24px" }}>
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
            style={{ marginTop: "16px" }}
          />
        </div>
        <div style={{ display: "block", margin: "16px 24px 0 24px" }}>
          <Typography variant="body1" component="div">
            Secteur d'activité
          </Typography>
          <Select
            style={{ width: "150px", marginRight: "24px" }}
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
        <div style={{ display: "block", margin: "16px 24px 0 24px" }}>
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
      {filter === "projet" && (
        <div style={{ display: "flex", margin: "16px 24px 0 24px" }}>
          <FormGroup
            style={{
              display: "flex",
              marginTop: 16,
            }}
          >
            <Typography variant="h6" component="div">
              Tags
            </Typography>
            <Grid container spacing={1} justifyContent="center">
              <Grid item>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={tags.social}
                      onChange={(e) =>
                        setTags({ ...tags, social: e.target.checked })
                      }
                    />
                  }
                  label="Projet social"
                />
              </Grid>
              <Grid item>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={tags.culturel}
                      onChange={(e) =>
                        setTags({ ...tags, culturel: e.target.checked })
                      }
                    />
                  }
                  label="Projet culturel"
                />
              </Grid>
              <Grid item>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={tags.sportif}
                      onChange={(e) =>
                        setTags({ ...tags, sportif: e.target.checked })
                      }
                    />
                  }
                  label="Projet sportif"
                />
              </Grid>
              <Grid item>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={tags.nature}
                      onChange={(e) =>
                        setTags({ ...tags, nature: e.target.checked })
                      }
                    />
                  }
                  label="Projet nature"
                />
              </Grid>
              <Grid item>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={tags.mediation}
                      onChange={(e) =>
                        setTags({ ...tags, mediation: e.target.checked })
                      }
                    />
                  }
                  label="Médiation"
                />
              </Grid>
              <Grid item>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={tags.animation}
                      onChange={(e) =>
                        setTags({ ...tags, animation: e.target.checked })
                      }
                    />
                  }
                  label="Animation"
                />
              </Grid>
              <Grid item>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={tags.sante}
                      onChange={(e) =>
                        setTags({ ...tags, sante: e.target.checked })
                      }
                    />
                  }
                  label="Santé"
                />
              </Grid>
            </Grid>
          </FormGroup>
        </div>
      )}
      <center>
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
                <h2
                  style={{ cursor: "pointer", color: "blue" }}
                  onClick={() => navigate("/structure/" + selectedCenter._id)}
                >
                  {selectedCenter.nom}
                </h2>
                <p>{selectedCenter.adresse}</p>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </center>

      {filter === "structure" || filter === "projet" ? (
        <AnnuaireStructure data={filteredMarkers} />
      ) : (
        <AnnuaireProjet></AnnuaireProjet>
      )}
    </div>
  );
}
