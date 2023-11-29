import React from "react";
import { Divider, TextField } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

export default function SignUp() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  function handleSubmit() {
    console.log(email, password, passwordConfirm);
  }

  return (
    <>
      <div style={{ margin: "30px" }}>
        <center>
          <Box sx={{ maxWidth: 500 }}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h5" component="div">
                  Créer un compte
                </Typography>
                <form>
                  <TextField
                    id="email"
                    label="Identifiant (email)"
                    variant="outlined"
                    style={{ margin: 24, width: "90%" }}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <TextField
                    id="password"
                    label="Mot de passe"
                    variant="outlined"
                    style={{ margin: 24, width: "90%" }}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <TextField
                    id="passwordConfirm"
                    label="Confirmer le mot de passe"
                    variant="outlined"
                    style={{ margin: 24, width: "90%" }}
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                  />
                  <Button
                    variant="contained"
                    style={{ margin: 24, width: "90%" }}
                    onClick={handleSubmit}
                  >
                    S'enregistrer
                  </Button>
                  <Divider></Divider>
                  <Typography
                    variant="body2"
                    style={{ margin: 24, width: "90%" }}
                  >
                    Déjà inscrit ?
                  </Typography>
                  <Button size="small" onClick={() => navigate("/signIn")}>
                    Se connecter
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
