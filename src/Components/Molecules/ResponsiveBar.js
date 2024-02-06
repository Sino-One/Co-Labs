import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../store/UserReducer";
import AuthService from "../../Services/AuthService";
import { StructuresContext } from "../../store/StructuresReducer";
import GroupAddRoundedIcon from "@mui/icons-material/GroupAddRounded";

const pages = [
  { name: "Structures", href: "/structures", current: false },
  { name: "Mes projets", href: "/mesProjets", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function isCurrent(location, path) {
  return location.pathname === path;
}

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [anchorElInvitation, setAnchorElInvitation] = React.useState(null);
  const [userStructure, setUserStructure] = useState({});
  const [userProjects, setUserProjects] = useState([{}]);
  const [waitingInvits, setWaitingInvits] = useState([]);

  const { user, setUser } = useContext(UserContext);
  const { structures } = useContext(StructuresContext);

  useEffect(() => {
    if (user) {
      const userStructure = structures.find(
        (structure) => structure._id === user.structure
      );
      setUserStructure(userStructure);
    }
  }, [user, structures]);

  useEffect(() => {
    let projects = [];
    if (userStructure && userStructure.projets) {
      userStructure.projets.map((projet) => {
        if (projet.user._id === user._id) {
          projects.push(projet);
        }
      });
      setUserProjects(projects);
    }
  }, [userStructure]);

  useEffect(() => {
    let invits = [];
    if (userProjects && userProjects.length > 0) {
      userProjects.map((projet) => {
        if (projet.waitingMembers && projet.waitingMembers.length > 0) {
          projet.waitingMembers.map((user) => {
            invits.push({ user, projet });
          });
        }
      });
      setWaitingInvits(invits);
    }
  }, [userProjects]);

  useEffect(() => {
    console.log("waitingInvits", waitingInvits);
  }, [waitingInvits]);

  const location = useLocation();
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleOpenInvitationMenu = (event) => {
    setAnchorElInvitation(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const settings = [
    !user
      ? { name: "Créer un compte", route: "/SignUp", mustBeLogged: false }
      : null,
    !user
      ? { name: "Se connecter", route: "/SignIn", mustBeLogged: false }
      : null,
    user ? { name: "Profil", route: "/profil", mustBeLogged: true } : null,
    user
      ? { name: "Se déconnecter", route: "/logout", mustBeLogged: true }
      : null,
  ];

  const handleCloseUserMenu = (route) => {
    setAnchorElUser(null);
    if (route === "/logout") {
      logOut();
      return;
    }
    if (route === "/SignIn" || route === "/SignUp" || route === "/profil")
      navigate(route);
  };
  const handleCloseInvitationMenu = (route, user, projet) => {
    setAnchorElInvitation(null);
    navigate(route, {
      state: {
        projet,
        user,
        projectStructure: userStructure,
      },
    });
  };

  const redirect = (page) => {
    navigate(page.href);
    handleCloseNavMenu();
  };

  const logOut = async () => {
    await AuthService.CallLogOut().then((res) => {
      console.log(res);
      setUser(null);
    });
    //   removeCookie("");
    // navigate("/signIn");
  };

  return (
    <>
      <AppBar position="static" style={{ backgroundColor: "grey" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              onClick={() => navigate("/structures")}
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
                cursor: "pointer",
              }}
            >
              LOGO
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page.name} onClick={() => redirect(page)}>
                    <Typography textAlign="center">{page.name}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              onClick={() => navigate("/structures")}
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page, index) => (
                <div
                  key={index}
                  onClick={() => redirect(page)}
                  className={classNames(
                    isCurrent(location, page.href)
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "px-3 py-2 rounded-md text-sm font-medium"
                  )}
                  aria-current={page.current ? "page" : undefined}
                >
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    {page.name}
                  </Button>
                </div>
              ))}
            </Box>

            {
              // TODO Invitations Component
              waitingInvits && waitingInvits.length > 0 && (
                <Box sx={{ flexGrow: 0, mr: "24px" }}>
                  <Tooltip title="Open invitations">
                    <IconButton
                      sx={{ p: 0 }}
                      onClick={handleOpenInvitationMenu}
                    >
                      <GroupAddRoundedIcon />
                      <div
                        style={{
                          fontSize: "small",
                          marginBottom: "24px",
                          color: "chartreuse",
                        }}
                      >
                        {waitingInvits.length}
                      </div>
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElInvitation}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElInvitation)}
                    onClose={handleCloseInvitationMenu}
                  >
                    {waitingInvits.map((invit, index) => {
                      return (
                        invit && (
                          <MenuItem
                            key={index}
                            onClick={() =>
                              handleCloseInvitationMenu(
                                "/projetDetails",
                                invit.user,
                                invit.projet
                              )
                            }
                          >
                            <Typography textAlign="center">
                              {invit.projet.projectName}
                            </Typography>
                          </MenuItem>
                        )
                      );
                    })}
                  </Menu>
                </Box>
              )
            }
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton sx={{ p: 0 }} onClick={handleOpenUserMenu}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => {
                  return (
                    setting && (
                      <MenuItem
                        key={setting.name}
                        onClick={() => handleCloseUserMenu(setting.route)}
                      >
                        <Typography textAlign="center">
                          {setting.name}
                        </Typography>
                      </MenuItem>
                    )
                  );
                })}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}
export default ResponsiveAppBar;
