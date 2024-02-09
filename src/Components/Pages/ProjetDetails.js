import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { Divider } from "@mui/material";
import Button from "@mui/material/Button";
import * as Api from "../../Utils/Api";
import { toast } from "react-toastify";
import { UserContext } from "../../store/UserReducer";
import CardActions from "@mui/material/CardActions";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

export default function ProjetDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(UserContext);
  const [waitingInvits, setWaitingInvits] = useState([]);
  const [projet, setProjet] = useState(location.state.projet);
  const [projectStructure, setProjectStructure] = useState(
    location.state.projectStructure
  );

  const handleJoin = () => {
    Api.post("askJoinProject", {
      idStructure: projectStructure._id,
      projectName: projet.projectName,
      user: user,
    }).then((data) => {
      setProjectStructure(data.data.structure);
      setProjet(data.data.project);
      toast.success(data.data.message);
    });
  };

  const handleAcceptMember = (user) => {
    Api.post("acceptJoinProject", {
      idStructure: projectStructure._id,
      projectName: projet.projectName,
      user: user,
    }).then((data) => {
      setProjectStructure(data.data.structure);
      setProjet(data.data.project);
      toast.success(data.data.message);
    });
  };

  const goToProfil = (id) => {
    navigate(`/profil/${id}`);
  };

  useEffect(() => {
    let invits = [];

    if (projet.waitingMembers && projet.waitingMembers.length > 0) {
      projet.waitingMembers.map((user) => {
        invits.push({ user, projet });
      });
    }
    setWaitingInvits(invits);
  }, [projet, projectStructure]);

  return (
    <>
      <Typography variant="h3">Projet</Typography>
      <Typography variant="h4">{projet.projectName}</Typography>
      <Typography variant="body1">{projet.description}</Typography>
      <Typography variant="h4">Tags</Typography>
      {projet &&
        projet.tags &&
        Object.keys(projet.tags).map((tag, index) => {
          return projet.tags[tag] ? (
            <Typography variant="subtitle2" key={index}>
              {tag}
            </Typography>
          ) : null;
        })}
      <Typography variant="h4">
        Initiateur du projet : {projet.user.username}
      </Typography>
      <Typography variant="h4">
        Membres du projets :
        {projet.members && projet.members.length > 0
          ? projet.members.map((member, index) => {
              return (
                <Typography
                  variant="subtitle2"
                  key={index}
                  onClick={() => goToProfil(member._id)}
                  style={{ cursor: "pointer", color: "blue" }}
                >
                  {member.username}
                </Typography>
              );
            })
          : null}
        <Typography variant="subtitle2">
          {projet.members ? projet.members.length : 0}
        </Typography>
      </Typography>
      {waitingInvits.length > 0 ? (
        <>
          <Typography variant="h4">Invitations en attente</Typography>

          {waitingInvits.map((invit, index) => {
            return (
              <Card sx={{ maxWidth: 200 }} key={index}>
                <CardContent>
                  <Typography
                    variant="h5"
                    component="div"
                    onClick={() => goToProfil(invit.user._id)}
                    style={{ cursor: "pointer", color: "blue" }}
                  >
                    {invit.user.username}
                  </Typography>
                </CardContent>
                {user._id === projet.user._id ? (
                  <CardActions>
                    <Button
                      size="small"
                      onClick={() => handleAcceptMember(invit.user)}
                    >
                      Ajouter
                    </Button>
                  </CardActions>
                ) : null}
              </Card>
            );
          })}
        </>
      ) : null}
      {projet.user?._id !== user?._id ? (
        <Button onClick={handleJoin}>
          Faire une demande pour rejoindre le projet
        </Button>
      ) : null}
      <Divider />
      <Typography variant="h3">Structure</Typography>
      <Typography variant="h4">{projectStructure?.nom}</Typography>
      <Typography variant="body1">{projectStructure?.adresse}</Typography>
    </>
  );
}
