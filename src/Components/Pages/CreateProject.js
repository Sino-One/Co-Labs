import React, { useState } from "react";
import { Divider, Select, TextField } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { Form, useNavigate } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import ButtonGroup from "@mui/material/ButtonGroup";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Textarea from "@mui/joy/Textarea";

export default function CreateProject() {
  const [visible, setVisible] = useState(true);
  const [description, setDescription] = useState("Description de votre projet");
  const [structureType, setStructureType] = useState("Social");
  const [projectName, setProjectName] = useState(null);
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const project = {
      name: projectName,
      description: description,
      structureType: structureType,
      visible: visible,
      preferences: preferences,
    };
    console.log(project);
  };

  return (
    <>
      <div className="m-32">
        <center>
          <Box sx={{ maxWidth: 1200 }}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h5" component="div">
                  Créer un projet
                </Typography>
                <TextField
                  id="nom"
                  label="Nom du projet"
                  variant="outlined"
                  className="m-24"
                  style={{ margin: 24, width: "90%" }}
                  onChange={(e) => setProjectName(e.target.value)}
                />
                <div
                  style={{
                    display: "flex",
                    marginTop: 48,
                    justifyContent: "space-evenly",
                  }}
                >
                  <FormGroup>
                    <Typography variant="body1" component="div">
                      Type de structure
                    </Typography>
                    <Select
                      style={{ width: "200px" }}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={structureType}
                      label="Type de structure"
                      onChange={(e) => setStructureType(e.target.value)}
                    >
                      <MenuItem value={"Social"}>Social</MenuItem>
                      <MenuItem value={"Medico-social"}>Médico-social</MenuItem>
                      <MenuItem value={"Mixte"}>Mixte</MenuItem>
                    </Select>
                  </FormGroup>
                  <FormGroup>
                    <Typography variant="body1" component="div">
                      Visible ?
                    </Typography>
                    <ButtonGroup
                      variant="outlined"
                      aria-label="outlined button group"
                    >
                      <Button
                        onClick={() => setVisible(true)}
                        style={{
                          backgroundColor: visible ? "lightgreen" : "",
                        }}
                      >
                        Oui
                      </Button>
                      <Button
                        onClick={() => setVisible(false)}
                        style={{
                          backgroundColor: !visible ? "lightblue" : "",
                        }}
                      >
                        Non
                      </Button>
                    </ButtonGroup>
                  </FormGroup>
                </div>
                <FormGroup
                  style={{
                    display: "block",
                    //          border: "solid 1px",
                    marginTop: 48,
                  }}
                >
                  <Typography variant="h6" component="div">
                    Tags
                  </Typography>
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
                <FormGroup style={{ marginTop: 48 }}>
                  <Typography variant="h6" component="div">
                    Description
                  </Typography>
                  <Textarea
                    slotProps={{
                      textarea: { placeholder: "Description de votre projet" },
                    }}
                    sx={{ borderRadius: "6px" }}
                    minRows={3}
                    style={{ margin: 24, width: "90%" }}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </FormGroup>
                <Button
                  variant="contained"
                  style={{ margin: 24, width: "90%", marginTop: "48px" }}
                  type="submit"
                  onClick={(e) => handleSubmit(e)}
                >
                  Envoyer
                </Button>
              </CardContent>
            </Card>
          </Box>
        </center>
      </div>
    </>
  );
}
