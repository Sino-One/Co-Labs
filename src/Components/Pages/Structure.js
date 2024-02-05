import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { StructuresContext } from "../../store/StructuresReducer";
import { useNavigate, useParams } from "react-router-dom";
import {
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { UserContext } from "../../store/UserReducer";

export default function Structure() {
  const navigate = useNavigate();
  const [userStructure, setUserStructure] = useState({});
  const { structures } = useContext(StructuresContext);
  const { user } = useContext(UserContext);
  const { id } = useParams();

  const structure = structures.find((structure) => structure._id === id);

  useEffect(() => {
    if (user) {
      const userStructure = structures.find(
        (structure) => structure._id === user.structure
      );
      if (userStructure) {
        setUserStructure(userStructure);
      }
    }
  }, [user, structures]);
  return (
    <>
      <h1>Structure</h1>
      <p>{structure.nom}</p>
      <p>{structure.adresse}</p>
      {structure.projets.map((projet, index) => (
        <Grid key={index} style={{ margin: "30px" }}>
          <Card
            sx={{ maxWidth: 345 }}
            onClick={() =>
              navigate("/projetDetails", { state: { projet, userStructure } })
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
    </>
  );
}
