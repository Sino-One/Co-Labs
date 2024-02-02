import React, { useState, useReducer } from "react";
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
import { useContext } from "react";
import StructureService from "../../Services/StructureService";
import { StructuresContext } from "../../store/StructuresReducer";
import { UserContext } from "../../store/UserReducer";

export default function CreateProject() {
  const [visible, setVisible] = useState(true);
  const [description, setDescription] = useState("Description de votre projet");
  const [publicType, setPublicType] = useState("Enfant");
  const [projectName, setProjectName] = useState(null);
  const [tags, setTags] = useState({
    social: false,
    culturel: false,
    sportif: false,
    nature: false,
    mediation: false,
    animation: false,
    sante: false,
  });

  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const { structures, addProjectToStructure } = useContext(StructuresContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const project = {
      idStructure: user.structure,
      projectName,
      description,
      publicType,
      visible,
      tags,
      user,
    };
    console.log(user);
    StructureService.addProject(project).then((data) => {
      if (data) {
        addProjectToStructure(data.structure);
        navigate("/mesProjets");
      }
    });
    console.log(structures);
  };

  return (
    <>
      <div className="m-32">
        <center>
          <Box sx={{ maxWidth: 1200 }}>
            <Card variant="outlined">
              <CardContent>
                <form onSubmit={handleSubmit}>
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
                        A qui s'adresse votre projet ?
                      </Typography>
                      <Select
                        style={{ width: "300px" }}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={publicType}
                        label="A qui s'adresse votre projet ?"
                        onChange={(e) => setPublicType(e.target.value)}
                      >
                        <MenuItem value={"Enfant"}>Enfant</MenuItem>
                        <MenuItem value={"Adulte"}>Adulte</MenuItem>
                        <MenuItem value={"EnfantH"}>
                          Enfant en situation de handicap
                        </MenuItem>
                        <MenuItem value={"AdulteH"}>
                          Adulte en situation de handicap
                        </MenuItem>
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
                          value={tags.social}
                          onChange={(e) =>
                            setTags({
                              ...tags,
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
                          value={tags.culturel}
                          onChange={(e) =>
                            setTags({
                              ...tags,
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
                          value={tags.sportif}
                          onChange={(e) =>
                            setTags({
                              ...tags,
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
                          value={tags.nature}
                          onChange={(e) =>
                            setTags({
                              ...tags,
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
                          value={tags.mediation}
                          onChange={(e) =>
                            setTags({
                              ...tags,
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
                          value={tags.animation}
                          onChange={(e) =>
                            setTags({
                              ...tags,
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
                          value={tags.sante}
                          onChange={(e) =>
                            setTags({
                              ...tags,
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
                        textarea: {
                          placeholder: "Description de votre projet",
                        },
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
                  >
                    Envoyer
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
