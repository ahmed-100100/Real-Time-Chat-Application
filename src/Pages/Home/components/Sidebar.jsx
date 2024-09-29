import { Avatar, IconButton, Button, Grid } from "@mui/material";
import { Settings, Logout } from "@mui/icons-material";
import GroupsIcon from "@mui/icons-material/Groups";
import ChatIcon from "@mui/icons-material/Chat";
import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { MainContext } from "../../../Contexts/MainContext";
import { stringToColor } from "../../../utils/helpers/getColorFromString";
import { getNameInitials } from "../../../utils/helpers/getNameInitials";
import UserProfileModal from "./UserProfileModal";

const Sidebar = ({ showGroups, setShowGroups }) => {
  const { setLogged, loggedUser } = useContext(MainContext);
  const [showUserProfile, setShowUserProfile] = useState(false);
  return (
    <>
      <UserProfileModal
        handleClose={() => setShowUserProfile(false)}
        open={showUserProfile}
        user={loggedUser}
      />
      <Grid
        item
        xs={1}
        sx={{
          backgroundColor: "#3A506B",
          color: "white",
          padding: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "100%",
        }}
      >
        <IconButton onClick={() => setShowUserProfile(true)}>
          <Avatar
            sx={{
              width: 60,
              height: 60,
              marginBottom: 4,
              marginTop: 2,
              bgcolor: `${stringToColor(loggedUser.name)}`,
            }}
          >
            {getNameInitials(loggedUser.name)}
          </Avatar>
        </IconButton>

        <IconButton
          sx={
            showGroups
              ? { color: "white" }
              : { color: "black", backgroundColor: "white" }
          }
          onClick={() => setShowGroups(false)}
        >
          <ChatIcon
            sx={showGroups ? { color: "white" } : { color: "#3A506B" }}
          />
        </IconButton>
        <IconButton
          sx={
            showGroups
              ? { color: "black", backgroundColor: "white" }
              : { color: "white" }
          }
          onClick={() => setShowGroups(true)}
        >
          <GroupsIcon
            sx={showGroups ? { color: "#3A506B" } : { color: "white" }}
          />
        </IconButton>

        <IconButton>
          <Settings sx={{ color: "white" }} />
        </IconButton>

        <Button
          sx={{ marginTop: "auto", color: "white" }}
          onClick={() => {
            setLogged(false);
          }}
          startIcon={<Logout />}
        >
          Logout
        </Button>
      </Grid>
    </>
  );
};

// Adding propTypes validation
Sidebar.propTypes = {
  showGroups: PropTypes.bool.isRequired, // showGroups is required and must be a boolean
  setShowGroups: PropTypes.func.isRequired, // setShowGroups is required and must be a function
};

export default Sidebar;
