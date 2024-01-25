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
import * as Api from "../../../Utils/Api";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const { data } = await Api.post("login", {
        email,
        password,
      });
      console.log(data);
      const { success, message } = data;
      if (success) {
        console.log(success, message);
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      } else {
        console.log(message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="m-32">
        <center>
          <Box sx={{ maxWidth: 500 }}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h5" component="div">
                  Se connecter
                </Typography>
                <form>
                  <TextField
                    id="email"
                    label="Identifiant (email)"
                    variant="outlined"
                    className="m-24"
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
                  <Button
                    variant="contained"
                    style={{ margin: 24, width: "90%" }}
                    onClick={handleSubmit}
                  >
                    Se connecter
                  </Button>
                  <Divider></Divider>
                  <Typography
                    variant="body2"
                    style={{ margin: 24, width: "90%" }}
                  >
                    Pas encore de compte ?
                  </Typography>
                  <Button size="small" onClick={() => navigate("/signUp")}>
                    S'inscrire
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
