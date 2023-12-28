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

export default function CreationStructure() {
  const [nomStructure, setNomStructure] = useState("");
  const [typeStructure, setTypeStructure] = useState("");
  const [adresseStructure, setAdresseStructure] = useState("");
  const [tailleStructure, setTailleStructure] = useState("");
  const [secteurStructure, setSecteurStructure] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
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
                  <TextField
                    id="typeStructure"
                    label="Type de la structure"
                    variant="outlined"
                    style={{ margin: 24, width: "90%" }}
                    onChange={(e) => setTypeStructure(e.target.value)}
                  />
                  <TextField
                    id="adresseStructure"
                    label="Adresse de la structure"
                    variant="outlined"
                    style={{ margin: 24, width: "90%" }}
                    onChange={(e) => setAdresseStructure(e.target.value)}
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
