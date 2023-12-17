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
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

const config = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    withCredentials: true,
  },
};

export default function SignUp() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-right",
    });

  async function handleSubmit() {
    console.log(email, password, passwordConfirm);
    try {
      const { data } = await axios.post(
        "http://localhost:5000/signup",
        {
          email,
          password,
          username,
        },
        config
      );
      const { success, message } = data;
      console.log(success, data);
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      } else {
        console.log(message);
        handleError(message);
      }
    } catch (error) {
      console.log(error);
    }
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
                <form>
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
