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

export default function Projects() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const { structures, setStructures } = useContext(StructuresContext);
  const [userProjects, setUserProjects] = useState([]);
  const [userStructure, setUserStructure] = useState({});
  const [membersProjects, setMembersProjects] = useState([]);

  useEffect(() => {
    if (user && structures) {
      setUserProjects([]);
      const userStructure = structures.find(
        (structure) => structure._id === user.structure
      );
      setUserStructure(userStructure);
      userStructure?.projets.map((projet) => {
        if (projet.user._id === user._id) {
          setUserProjects((userProjects) => [
            ...userProjects,
            { projet, structure: userStructure },
          ]);
        }
      });
      structures.map((structure) => {
        structure.projets.map((projet) => {
          if (projet.members) {
            const isInProject = projet.members.some(
              (obj) => obj._id === user._id
            );
            if (isInProject) {
              console.log(projet);
              setMembersProjects((membersProjects) => [
                ...membersProjects,
                { projet, structure },
              ]);
            }
          }
        });
      });
    }
  }, [user, structures]);

  console.log(userProjects);
  console.log(membersProjects);

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
