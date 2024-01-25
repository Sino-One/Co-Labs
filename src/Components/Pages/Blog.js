import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Blog() {
  const navigate = useNavigate();
  return (
    <>
      <Button variant="contained" onClick={() => navigate("/createProject")}>
        Créer un projet
      </Button>
    </>
  );
}
