import React, { useEffect } from "react";
import { useContext, useState } from "react";
import { UserContext } from "../../store/UserReducer";
import EditIcon from "@mui/icons-material/Edit";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import IconButton from "@mui/material/IconButton";
import { Checkbox } from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Typography } from "@mui/material";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import ModalComponent from "../Atoms/Modal";
import * as Api from "../../Utils/Api";
import { toast } from "react-toastify";
import { StructuresContext } from "../../store/StructuresReducer";
import { useParams } from "react-router-dom";

export default function Profil() {
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const [userDetails, setUserDetails] = useState({});
  const { structures } = useContext(StructuresContext);
  const [userStructure, setUserStructure] = useState({});
  const [changePreferences, setChangePreferences] = useState(false);
  const [dispo, setDispo] = useState(user.availability);
  const [preferences, setPreferences] = useState({
    social: false,
    culturel: false,
    sportif: false,
    nature: false,
    mediation: false,
    animation: false,
    sante: false,
  });
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleChangePreferences = async () => {
    if (changePreferences) {
      await Api.post("updateUser", { id: user._id, preferences })
        .then((res) => {
          toast.success("Préférence modifiée");
        })
        .catch((err) => {
          console.log(err);
        });
    }
    user.preferences = preferences;
    setChangePreferences(!changePreferences);
  };

  const handleAvailability = async () => {
    await Api.post("updateUser", { id: user._id, availability: dispo })
      .then((res) => {
        toast.success("Disponibilité modifiée");
      })
      .catch((err) => {
        console.log(err);
      });
    user.availability = dispo;
  };

  useEffect(() => {
    if (dispo !== user.availability) {
      handleAvailability();
    }
  }, [dispo]);

  const handleOpen = (prop) => {
    switch (prop) {
      case "username":
        setTitle("Changer le nom d'utilisateur");
        setContent("Nouveau nom d'utilisateur");
        break;
      case "email":
        setTitle("Changer l'adresse mail");
        setContent("Nouvelle adresse mail");
        break;
      case "password":
        setTitle("Changer le mot de passe");
        setContent("Nouveau mot de passe");
        break;
      case "profession":
        setTitle("Changer la profession");
        setContent("");
        break;
      default:
        setTitle("test");
        setContent("test");
    }
    setOpen(true);
  };

  const handleClose = (inputValue, type) => {
    switch (type) {
      case "username":
        user.username = inputValue;
        break;
      case "email":
        user.email = inputValue;
        break;
      case "password":
        user.password = inputValue;
        break;
      case "profession":
        user.profession = inputValue;
        break;
      default:
        break;
    }
    setOpen(false);
  };

  useEffect(() => {
    if (user && !id) {
      setPreferences(user.preferences);
      setDispo(user.availability);
      if (structures) {
        structures.map((structure) => {
          if (structure._id === user.structure) {
            setUserStructure(structure);
          }
        });
      }
    } else {
      if (id) {
        Api.post("getUser", { id }).then((res) => {
          setUserDetails(res.data.user);
        });
      }
    }
  }, [user, structures]);

  useEffect(() => {
    if (userDetails && id) {
      if (structures) {
        structures.map((structure) => {
          if (structure._id === userDetails.structure) {
            setUserStructure(structure);
          }
        });
      }
      setPreferences(userDetails.preferences);
      setDispo(userDetails.availability);
    }
  }, [userDetails]);

  return (
    <>
      <div className="m-16">
        <ModalComponent
          handleClose={handleClose}
          open={open}
          title={title}
          content={content}
          value={
            title === "Changer le nom d'utilisateur"
              ? user.username
              : title === "Changer l'adresse mail"
              ? user.email
              : title === "Changer la profession"
              ? user.profession
              : ""
          }
        />
        <center>
          <Typography variant="h4" component="div">
            Profil
          </Typography>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <h2>
              {!id ? user.username : userDetails ? userDetails.username : null}
            </h2>
            {!id && (
              <IconButton
                aria-label="delete"
                size="small"
                onClick={() => handleOpen("username")}
              >
                <EditIcon fontSize="inherit" />
              </IconButton>
            )}
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <h2>{!id ? user.email : userDetails.email}</h2>
            {!id && (
              <IconButton
                aria-label="delete"
                size="small"
                onClick={() => handleOpen("email")}
              >
                <EditIcon fontSize="inherit" />
              </IconButton>
            )}
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <h2>{!id ? user.profession : userDetails.profession}</h2>
            {!id && (
              <IconButton
                aria-label="delete"
                size="small"
                onClick={() => handleOpen("profession")}
              >
                <EditIcon fontSize="inherit" />
              </IconButton>
            )}
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <h1>Structure : </h1>
            <h2>{userStructure.nom}</h2>
          </div>
          {/* <Button onClick={() => handleOpen("password")}>
            Changer le mot de passe
          </Button> */}
          <FormGroup style={{ marginTop: 32 }}>
            <Typography variant="h4" component="div">
              Préférences
            </Typography>
            <FormControlLabel
              control={
                <Checkbox
                  disabled={!changePreferences}
                  checked={preferences?.social}
                  value={preferences?.social}
                  onChange={(e) =>
                    setPreferences({
                      ...preferences,
                      social: e.target.checked,
                    })
                  }
                />
              }
              label="Projet social"
              style={{ justifyContent: "center" }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  disabled={!changePreferences}
                  checked={preferences?.culturel}
                  value={preferences?.culturel}
                  onChange={(e) =>
                    setPreferences({
                      ...preferences,
                      culturel: e.target.checked,
                    })
                  }
                />
              }
              label="Projet culturel"
              style={{ justifyContent: "center" }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  disabled={!changePreferences}
                  checked={preferences?.sportif}
                  value={preferences?.sportif}
                  onChange={(e) =>
                    setPreferences({
                      ...preferences,
                      sportif: e.target.checked,
                    })
                  }
                />
              }
              label="Projet sportif"
              style={{ display: "block" }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  disabled={!changePreferences}
                  checked={preferences?.nature}
                  value={preferences?.nature}
                  onChange={(e) =>
                    setPreferences({
                      ...preferences,
                      nature: e.target.checked,
                    })
                  }
                />
              }
              label="Projet nature"
              style={{ display: "block" }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  disabled={!changePreferences}
                  checked={preferences?.mediation}
                  value={preferences?.mediation}
                  onChange={(e) =>
                    setPreferences({
                      ...preferences,
                      mediation: e.target.checked,
                    })
                  }
                />
              }
              label="Médiation"
              style={{ display: "block" }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  disabled={!changePreferences}
                  checked={preferences?.animation}
                  value={preferences?.animation}
                  onChange={(e) =>
                    setPreferences({
                      ...preferences,
                      animation: e.target.checked,
                    })
                  }
                />
              }
              label="Animation"
              style={{ display: "block" }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  disabled={!changePreferences}
                  checked={preferences?.sante}
                  value={preferences?.sante}
                  onChange={(e) =>
                    setPreferences({
                      ...preferences,
                      sante: e.target.checked,
                    })
                  }
                />
              }
              label="Santé"
              style={{ display: "block" }}
            />
            {!id && (
              <IconButton
                aria-label="delete"
                size="small"
                onClick={() => handleChangePreferences()}
              >
                {changePreferences ? (
                  <CheckCircleIcon fontSize="inherit" />
                ) : (
                  <EditIcon fontSize="inherit" />
                )}
              </IconButton>
            )}
          </FormGroup>
          <Typography variant="body1" component="div">
            Disponibilité projets ?
          </Typography>
          <ButtonGroup variant="outlined" aria-label="outlined button group">
            <Button
              disabled={id}
              onClick={() => setDispo(true)}
              style={{
                backgroundColor: dispo ? "lightgreen" : "",
              }}
            >
              Oui
            </Button>
            <Button
              disabled={id}
              onClick={() => setDispo(false)}
              style={{
                backgroundColor: !dispo ? "lightblue" : "",
              }}
            >
              Non
            </Button>
          </ButtonGroup>
        </center>
      </div>
    </>
  );
}
