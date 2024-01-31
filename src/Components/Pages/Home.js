import React from "react";
import CardComponent from "../Molecules/Card";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import { useContext, useEffect } from "react";
import { StructuresContext } from "../../store/StructuresReducer";
import StructureService from "../../Services/StructureService";

export default function Home() {
  const { setStructures } = useContext(StructuresContext);

  useEffect(() => {
    async function fetchStructures() {
      await StructureService.getAllStructures().then((structures) => {
        setStructures(structures);
      });
    }
    fetchStructures();
  }, []);

  return (
    <>
      <Grid
        container
        spacing={12}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        style={{ margin: "30px", justifyContent: "center" }}
      >
        <Grid xs="auto">
          <CardComponent>xs=6 md=8</CardComponent>
        </Grid>
        <Grid xs="auto">
          <CardComponent>xs=6 md=4</CardComponent>
        </Grid>
        <Grid xs="auto">
          <CardComponent>xs=6 md=4</CardComponent>
        </Grid>
      </Grid>
    </>
  );
}
