import React, { useEffect } from "react";
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
import AuthService from "../../../Services/AuthService";
import { useContext } from "react";
import { UserContext } from "../../../store/UserReducer";
export default function UserPrefs() {
  const { setUser } = useContext(UserContext);
  const [dispo, setDispo] = useState(true);

  const [preferences, setPreferences] = useState({
    social: false,
    culturel: false,
    sportif: false,
    nature: false,
    mediation: false,
    animation: false,
    sante: false,
  });

  const navigate = useNavigate();

  const prevUser = useLocation().state.user;
  console.log(prevUser);

  async function handleSubmit(event) {
    event.preventDefault();
    // navigate("/");
    const user = {
      ...prevUser,
      availability: dispo,
      preferences: preferences,
    };
    handleSignUp(user);
  }

  const handleSignUp = async (data) => {
    await AuthService.CallSignUp(data).then((user) => {
      setUser(user);
      navigate("/home");
    });
  };

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
                        value={preferences.social}
                        onChange={(e) =>
                          setPreferences({
                            ...preferences,
                            social: e.target.checked,
                          })
                        }
                      />
                    }
                    label="Projet social"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        value={preferences.culturel}
                        onChange={(e) =>
                          setPreferences({
                            ...preferences,
                            culturel: e.target.checked,
                          })
                        }
                      />
                    }
                    label="Projet culturel"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        value={preferences.sportif}
                        onChange={(e) =>
                          setPreferences({
                            ...preferences,
                            sportif: e.target.checked,
                          })
                        }
                      />
                    }
                    label="Projet sportif"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        value={preferences.nature}
                        onChange={(e) =>
                          setPreferences({
                            ...preferences,
                            nature: e.target.checked,
                          })
                        }
                      />
                    }
                    label="Projet nature"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        value={preferences.mediation}
                        onChange={(e) =>
                          setPreferences({
                            ...preferences,
                            mediation: e.target.checked,
                          })
                        }
                      />
                    }
                    label="Médiation"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        value={preferences.animation}
                        onChange={(e) =>
                          setPreferences({
                            ...preferences,
                            animation: e.target.checked,
                          })
                        }
                      />
                    }
                    label="Animation"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        value={preferences.sante}
                        onChange={(e) =>
                          setPreferences({
                            ...preferences,
                            sante: e.target.checked,
                          })
                        }
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
