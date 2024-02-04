import React, { useEffect } from "react";
import { TextField } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import SearchBar from "../../Atoms/SearchBar";
import * as Api from "../../../Utils/Api";
import { MenuItem, Select } from "@mui/material";
import { toast } from "react-toastify";

export const professionType = {
  educSpe: "Educateur spécialisé",
  educRue: "Educateur de rue",
  moniteur: "Moniteur éducateur",
  maitreMaison: "Maître / Maîtress de maison",
  chefService: "Chef de service",
  directeur: "Directeur",
  infirmiere: "Infirmière",
  animateur: "Animateur",
};

export default function Bases() {
  const navigate = useNavigate();
  const prevUser = useLocation().state.user;

  const [profession, setProfession] = useState(professionType.educSpe);
  const [structure, setStructure] = useState("");
  const [structures, setStructures] = useState([]);

  useEffect(() => {
    const getStructures = async () => {
      const data = await Api.get("getStructures");
      if (data.data) {
        setStructures(data.data);
      } else {
        console.log("erreur de chargement des structures");
      }
    };
    getStructures();
  }, []);

  async function handleSubmit() {
    toast.info("C'est parfait ! Encore une dernière étape ");
    const user = {
      ...prevUser,
      profession,
      structure,
    };
    console.log(structure);
    navigate("/userPrefs", { state: { user } });
  }

  Object.keys(professionType).map((key, value) =>
    console.log(key, professionType[key])
  );

  function handleCreateStructure() {
    navigate("/creationStructure");
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
                  <Typography
                    variant="body1"
                    component="div"
                    style={{ margin: 24, width: "90%" }}
                  >
                    Quelle est votre profession ?
                  </Typography>
                  <Select
                    style={{ width: "90%" }}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={profession}
                    label="Secteur d'activité"
                    onChange={(e) => setProfession(e.target.value)}
                  >
                    {Object.keys(professionType).map((key) => (
                      <MenuItem value={professionType[key]} key={key}>
                        {professionType[key]}
                      </MenuItem>
                    ))}
                  </Select>
                  <div style={{ display: "flex" }}>
                    <SearchBar
                      placeholder={"Nom de votre structure"}
                      data={structures}
                      onSearch={(e) =>
                        structures.forEach((item) => {
                          if (item.nom === e) setStructure(item);
                        })
                      }
                    />
                    <Button
                      variant="contained"
                      style={{ marginTop: 32, height: "40px", marginLeft: -64 }}
                      onClick={handleCreateStructure}
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
