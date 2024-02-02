import React from "react";
import { TextField } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import * as Api from "../../../Utils/Api";
import { getGeocode } from "../../../Utils/GeoCode";
import AdressSearchBar from "../../Atoms/AdressSearchBar";
import { Select } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";

export default function CreationStructure() {
  const [nomStructure, setNomStructure] = useState("");
  const [typeStructure, setTypeStructure] = useState("TODO");
  const [adresseStructure, setAdresseStructure] = useState("");
  const [tailleStructure, setTailleStructure] = useState("");
  const [secteurStructure, setSecteurStructure] = useState("Social");
  const [adressResult, setAdressResult] = useState("");
  const [isDone, setIsDone] = useState(false);
  const [error, setError] = useState(false);
  const [structureType, setStructureType] = useState("Social");

  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    if (isDone && adresseStructure != "") {
      const { data } = await Api.post("creationStructure", {
        nom: nomStructure,
        type: typeStructure,
        adresse: adresseStructure,
        effectif: tailleStructure,
        secteur: secteurStructure,
        structureType: structureType,
      });
      const { success, message } = data;
      console.log(success, data);
      if (success) {
        setTimeout(() => {
          navigate(-1);
        }, 1000);
      } else {
        console.log(message);
      }
    } else {
      setIsDone(false);
      setError(true);
    }
  }

  return (
    <>
      <div style={{ margin: "50px" }}>
        <center>
          <Box sx={{ maxWidth: 500 }}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h5" component="div">
                  Structure
                </Typography>
                <form onSubmit={handleSubmit}>
                  <TextField
                    id="nomStructure"
                    label="Nom de la structure"
                    variant="outlined"
                    style={{ margin: 24, width: "90%" }}
                    onChange={(e) => setNomStructure(e.target.value)}
                  />
                  <AdressSearchBar
                    placeholder={"Adresse de votre structure"}
                    data={adressResult}
                    onSearch={(e) => {
                      getGeocode("address", e)
                        .then((response) => {
                          setAdressResult(
                            response.results[0].formatted_address
                          );
                          setAdresseStructure(
                            response.results[0].formatted_address
                          );
                        })
                        .catch((error) => {
                          console.error(error);
                        });
                    }}
                    setIsDone={(v) => setIsDone(v)}
                    isDone={isDone}
                    error={error}
                  />
                  <TextField
                    id="tailleStructure"
                    label="Nombre de professionnel dans la structure"
                    variant="outlined"
                    style={{ margin: 24, width: "90%" }}
                    onChange={(e) => setTailleStructure(e.target.value)}
                  />
                  <Typography variant="body1" component="div">
                    Secteur d'activité
                  </Typography>
                  <Select
                    style={{ margin: 24, width: "90%" }}
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
                  <Typography variant="body1" component="div">
                    Type de la structure
                  </Typography>
                  <Select
                    style={{ margin: 24, width: "90%" }}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={typeStructure}
                    label="Type de structure"
                    onChange={(e) => setTypeStructure(e.target.value)}
                  >
                    {/* TODO */}
                    <MenuItem value={"TODO"}>TODO</MenuItem>
                    <MenuItem value={"Medico-social"}>TODO</MenuItem>
                    <MenuItem value={"Mixte"}>TODO</MenuItem>
                  </Select>
                  <Button
                    variant="contained"
                    style={{ margin: 24, width: "90%", marginTop: "48px" }}
                    type="submit"
                  >
                    Valider
                  </Button>
                </form>
              </CardContent>
            </Card>
          </Box>
        </center>
      </div>
    </>
  );
}
