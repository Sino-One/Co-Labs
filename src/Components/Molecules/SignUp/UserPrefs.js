import React from "react";
import { TextField } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { Checkbox } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useState } from "react";
import axios from "axios";

const config = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    withCredentials: true,
  },
};

export default function UserPrefs() {
  const [dispo, setDispo] = useState(true);
  const [social, setSocial] = useState(false);
  const [culturel, setCulturel] = useState(false);
  const [sportif, setSportif] = useState(false);
  const [nature, setNature] = useState(false);
  const [mediation, setMediation] = useState(false);
  const [animation, setAnimation] = useState(false);
  const [sante, setSante] = useState(false);

  const navigate = useNavigate();

  const prevUser = useLocation().state.user;

  async function handleSubmit(event) {
    event.preventDefault();
    console.log(
      dispo,
      social,
      culturel,
      sportif,
      nature,
      mediation,
      animation,
      sante
    );
    // navigate("/");
    const user = {
      ...prevUser,
      availability: dispo,
      social: social,
      culturel: culturel,
      sportif: sportif,
      nature: nature,
      mediation: mediation,
      animation: animation,
      sante: sante,
    };
    try {
      const { data } = await axios.post(
        "http://localhost:5000/signup",
        {
          user,
        },
        config
      );
      const { success, message } = data;
      console.log(success, data);
      if (success) {
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      } else {
        console.log(message);
      }
    } catch (error) {
      console.log(error);
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
                  Mes préférences
                </Typography>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        value={social}
                        onChange={(e) => setSocial(e.target.checked)}
                      />
                    }
                    label="Projet social"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        value={culturel}
                        onChange={(e) => setCulturel(e.target.checked)}
                      />
                    }
                    label="Projet culturel"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        value={sportif}
                        onChange={(e) => setSportif(e.target.checked)}
                      />
                    }
                    label="Projet sportif"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        value={nature}
                        onChange={(e) => setNature(e.target.checked)}
                      />
                    }
                    label="Projet nature"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        value={mediation}
                        onChange={(e) => setMediation(e.target.checked)}
                      />
                    }
                    label="Médiation"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        value={animation}
                        onChange={(e) => setAnimation(e.target.checked)}
                      />
                    }
                    label="Animation"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        value={sante}
                        onChange={(e) => setSante(e.target.checked)}
                      />
                    }
                    label="Santé"
                  />
                </FormGroup>
                <Typography variant="body1" component="div">
                  Disponibilité projets ?
                </Typography>
                <ButtonGroup
                  variant="outlined"
                  aria-label="outlined button group"
                >
                  <Button
                    onClick={() => setDispo(true)}
                    style={{
                      backgroundColor: dispo ? "lightgreen" : "",
                    }}
                  >
                    Oui
                  </Button>
                  <Button
                    onClick={() => setDispo(false)}
                    style={{
                      backgroundColor: !dispo ? "lightblue" : "",
                    }}
                  >
                    Non
                  </Button>
                </ButtonGroup>
                <Button
                  variant="contained"
                  style={{ margin: 24, width: "90%", marginTop: "48px" }}
                  type="submit"
                  onClick={handleSubmit}
                >
                  C'est tout bon !
                </Button>
              </CardContent>
            </Card>
          </Box>
        </center>
      </div>
    </>
  );
}
