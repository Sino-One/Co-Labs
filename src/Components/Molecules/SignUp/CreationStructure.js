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
import {
  setKey,
  setLanguage,
  setRegion,
  geocode,
  RequestType,
} from "react-geocode";
import SearchBar from "../../Atoms/SearchBar";
import AdressSearchBar from "../../Atoms/AdressSearchBar";

setKey(process.env.REACT_APP_GOOGLE_MAPS_API_KEY); // Your API key here.

// Set default response language (optional).
// This sets the default language for geocoding responses.
setLanguage("fr"); // Default language for responses.

// Set default response region (optional).
// This sets the default region for geocoding responses.
setRegion("fr"); // Default region for responses.

export default function CreationStructure() {
  const [nomStructure, setNomStructure] = useState("");
  const [typeStructure, setTypeStructure] = useState("");
  const [adresseStructure, setAdresseStructure] = useState("");
  const [tailleStructure, setTailleStructure] = useState("");
  const [secteurStructure, setSecteurStructure] = useState("");
  const [adressResult, setAdressResult] = useState("");
  const [isDone, setIsDone] = useState(false);
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const address = "22 Av. Pierre de Coubertin Bis Avignon";

  async function handleSubmit(event) {
    event.preventDefault();
    if (isDone && adresseStructure != "") {
      console.log(
        nomStructure,
        typeStructure,
        adresseStructure,
        tailleStructure,
        secteurStructure
      );
      const { data } = await Api.post("creationStructure", {
        nom: nomStructure,
        type: typeStructure,
        adresse: adresseStructure,
        effectif: tailleStructure,
        secteur: secteurStructure,
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
                <form>
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
                      geocode(RequestType.ADDRESS, e)
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
                    id="typeStructure"
                    label="Type de la structure"
                    variant="outlined"
                    style={{ margin: 24, width: "90%" }}
                    onChange={(e) => setTypeStructure(e.target.value)}
                  />
                  <TextField
                    id="tailleStructure"
                    label="Nombre de professionnel dans la structure"
                    variant="outlined"
                    style={{ margin: 24, width: "90%" }}
                    onChange={(e) => setTailleStructure(e.target.value)}
                  />
                  <TextField
                    id="secteurStructure"
                    label="Secteur d'activité"
                    variant="outlined"
                    style={{ margin: 24, width: "90%" }}
                    onChange={(e) => setSecteurStructure(e.target.value)}
                  />
                  <Button
                    variant="contained"
                    style={{ margin: 24, width: "90%", marginTop: "48px" }}
                    onClick={handleSubmit}
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
