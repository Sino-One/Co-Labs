import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Button, Input, Typography } from "@mui/material";
import { toast } from "react-toastify";
import * as Api from "../../Utils/Api";
import { Select } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { professionType } from "../Molecules/SignUp/Bases";
import { useContext } from "react";
import { UserContext } from "../../store/UserReducer";

const style = {
  display: "block",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export default function ModalComponent({
  handleClose,
  open,
  title,
  content,
  value,
}) {
  const { user } = useContext(UserContext);
  const [inputValue, setInputValue] = useState("");
  const [inputPasswordValue, setInputPasswordValue] = useState("");
  const [profession, setProfession] = useState(user.profession);
  const [inputConfirmValue, setInputConfirmValue] = useState("");
  const [oldInputValue, setOldInputValue] = useState("");

  const handleSend = () => {
    switch (title) {
      case "Changer le nom d'utilisateur":
        Api.post("updateUser", { id: user._id, username: inputValue }).then(
          (res) => {
            toast.success("Nom d'utilisateur modifié");
          }
        );
        handleClose(inputValue, "username");
        break;
      case "Changer l'adresse mail":
        Api.post("updateUser", { id: user._id, email: inputValue }).then(
          (res) => {
            toast.success("Adresse mail modifiée");
          }
        );
        handleClose(inputValue, "email");
        break;
      case "Changer le mot de passe":
        if (
          inputPasswordValue !== "" &&
          inputConfirmValue !== "" &&
          inputPasswordValue === inputConfirmValue &&
          oldInputValue === user.password
        ) {
          Api.post("updateUser", { id: user._id, password: inputValue }).then(
            (res) => {
              toast.success("Mot de passe modifié");
            }
          );
          handleClose(inputValue, "password");
        } else {
          toast.error("Les mots de passe ne correspondent pas");
          return;
        }
        break;
      case "Changer la profession":
        Api.post("updateUser", { id: user._id, profession }).then((res) => {
          toast.success("Profession modifiée");
        });
        handleClose(profession, "profession");
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <div>
          <Box sx={{ ...style, width: 400 }}>
            <Typography>{title}</Typography>
            {title === "Changer la profession" ? (
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
            ) : title === "Changer le mot de passe" ? (
              <>
                <Input
                  placeholder={"Ancien mot de passe"}
                  onChange={(e) => setOldInputValue(e.target.value)}
                  value={oldInputValue}
                  type="password"
                ></Input>
                <Input
                  placeholder={content}
                  onChange={(e) => setInputPasswordValue(e.target.value)}
                  value={inputPasswordValue}
                  type="password"
                ></Input>
                <Input
                  placeholder={"Confirmer le mot de passe"}
                  onChange={(e) => setInputConfirmValue(e.target.value)}
                  value={inputConfirmValue}
                  type="password"
                ></Input>
              </>
            ) : (
              <Input
                placeholder={value}
                onChange={(e) => setInputValue(e.target.value)}
              ></Input>
            )}

            <Button onClick={() => handleSend()}>Valider</Button>
          </Box>
        </div>
      </Modal>
    </div>
  );
}
