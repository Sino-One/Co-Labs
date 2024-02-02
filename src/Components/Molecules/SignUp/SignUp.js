import React from "react";
import { Divider, TextField } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function SignUp() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const user = {
      email,
      password,
      confirmPassword: passwordConfirm,
      username,
    };
    navigate("/bases", { state: { user } });
  }

  return (
    <>
      <div className="m-32">
        <center>
          <Box sx={{ maxWidth: 500 }}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h5" component="div">
                  Créer un compte
                </Typography>
                <form onSubmit={handleSubmit}>
                  <TextField
                    id="username"
                    label="Identifiant"
                    variant="outlined"
                    style={{ margin: 24, width: "90%" }}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <TextField
                    id="email"
                    label="Email"
                    variant="outlined"
                    type="email"
                    style={{ margin: 24, width: "90%" }}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <TextField
                    id="password"
                    label="Mot de passe"
                    variant="outlined"
                    type="password"
                    style={{ margin: 24, width: "90%" }}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <TextField
                    id="passwordConfirm"
                    label="Confirmer le mot de passe"
                    variant="outlined"
                    type="password"
                    style={{ margin: 24, width: "90%" }}
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                  />
                  <Button
                    variant="contained"
                    style={{ margin: 24, width: "90%" }}
                    type="submit"
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
