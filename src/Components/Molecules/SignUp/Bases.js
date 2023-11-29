import React from "react";
import { TextField } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

export default function Bases() {
  const navigate = useNavigate();

  const [profession, setProfession] = useState("");
  const [structure, setStructure] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    console.log(profession, structure);
    // navigate("/userPrefs"); ou
    // navigate("/creationStructure");
  }
  return (
    <>
      <div style={{ margin: "50px" }}>
        <center>
          <Box sx={{ maxWidth: 500 }}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h5" component="div">
                  Inscription
                </Typography>
                <form>
                  <TextField
                    id="profession"
                    label="Quelle est votre profession ?"
                    variant="outlined"
                    style={{ margin: 24, width: "90%" }}
                    onChange={(e) => setProfession(e.target.value)}
                  />
                  <div style={{ display: "flex" }}>
                    <TextField
                      id="structure"
                      label="Votre structure"
                      variant="outlined"
                      style={{ margin: 24, width: "90%" }}
                      onChange={(e) => setStructure(e.target.value)}
                    />
                    <Button
                      variant="contained"
                      style={{ marginTop: 32, height: "40px" }}
                    >
                      +
                    </Button>
                  </div>

                  <Button
                    variant="contained"
                    style={{ margin: 24, width: "90%", marginTop: "48px" }}
                    onClick={handleSubmit}
                  >
                    Valider
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
