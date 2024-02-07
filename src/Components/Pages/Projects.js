import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../store/UserReducer";
import { StructuresContext } from "../../store/StructuresReducer";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import IconButton from "@mui/material/IconButton";
import { toast } from "react-toastify";
import * as Api from "../../Utils/Api";

export default function Projects() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const { structures, setStructures } = useContext(StructuresContext);
  const [userProjects, setUserProjects] = useState([]);
  const [userStructure, setUserStructure] = useState({});
  const [membersProjects, setMembersProjects] = useState([]);

  const handleDelete = (id, projectName) => {
    Api.post("deleteProject", {
      idStructure: id,
      projectName: projectName,
    }).then((data) => {
      setUserStructure(data.data.structure);
      toast.success(data.data.message);
    });
  };

  useEffect(() => {
    if (structures) {
      structures.map((structure) => {
        structure.projets.map((projet) => {
          if (projet.members) {
            const isInProject = projet.members.some(
              (obj) => obj._id === user._id
            );
            if (isInProject) {
              setMembersProjects((membersProjects) => [
                ...membersProjects,
                { projet, structure },
              ]);
            }
          }
        });
      });
    }
    if (user) {
      const userStructureFirst = structures.find(
        (s) => s._id === user.structure
      );
      setUserStructure(userStructureFirst);
    }
  }, [user, structures]);

  useEffect(() => {
    if (user && userStructure) {
      setUserProjects([]);
      if (userStructure.projets) {
        userStructure.projets.map((projet) => {
          if (projet.user._id === user._id) {
            setUserProjects((userProjects) => [
              ...userProjects,
              { projet, structure: userStructure },
            ]);
          }
        });
      }
    }
  }, [userStructure]);

  return (
    <>
      <h1>Mes projets</h1>
      <Grid
        container
        spacing={12}
        columnSpacing={{ sm: 2, md: 3 }}
        style={{ justifyContent: "center", margin: "0 -24px" }}
      >
        {userProjects.map(({ projet, structure }, index) => (
          <Grid key={index} style={{ margin: "30px" }}>
            <IconButton
              aria-label="delete"
              size="small"
              onClick={() => handleDelete(structure._id, projet.projectName)}
              style={{ float: "right" }}
            >
              <DeleteForeverRoundedIcon fontSize="inherit" />
            </IconButton>
            <Card
              sx={{ maxWidth: 345 }}
              onClick={() =>
                navigate("/projetDetails", {
                  state: {
                    projet,
                    user,
                    projectStructure: structure,
                  },
                })
              }
            >
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {projet.projectName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {projet.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
      <h1>Les projets que j'ai rejoins</h1>
      <Grid
        container
        spacing={12}
        columnSpacing={{ sm: 2, md: 3 }}
        style={{ justifyContent: "center", margin: "0 -24px" }}
      >
        {membersProjects.map(({ projet, structure }, index) => (
          <Grid key={index} style={{ margin: "30px" }}>
            <Card
              sx={{ maxWidth: 345 }}
              onClick={() =>
                navigate("/projetDetails", {
                  state: {
                    projet,
                    user,
                    projectStructure: structure,
                  },
                })
              }
            >
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {projet.projectName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {projet.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Button variant="contained" onClick={() => navigate("/createProject")}>
        Créer un projet
      </Button>
    </>
  );
}
