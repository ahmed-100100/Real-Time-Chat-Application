import { Avatar, IconButton, Button, Grid } from "@mui/material";
import {
  Home,
  Chat,
  Notifications,
  Settings,
  Logout,
} from "@mui/icons-material";
import PropTypes from "prop-types";

const Sidebar = ({ showGroups, setShowGroups }) => {
  return (
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
      <Avatar
        alt="User Profile"
        src="/path/to/image.jpg"
        sx={{ width: 60, height: 60, marginBottom: 4, marginTop: 2 }}
      />

      <IconButton>
        <Home sx={{ color: "white" }} />
      </IconButton>
      <IconButton>
        <Chat sx={{ color: "white" }} />
      </IconButton>
      <IconButton>
        <Notifications sx={{ color: "white" }} />
      </IconButton>
      <IconButton>
        <Settings sx={{ color: "white" }} />
      </IconButton>

      <Button
        sx={
          showGroups
            ? { marginTop: 2, color: "black", backgroundColor: "white" }
            : { marginTop: 2, color: "white" }
        }
        onClick={() => setShowGroups(true)}
      >
        Groups
      </Button>
      <Button
        sx={
          showGroups
            ? { color: "white" }
            : { color: "black", backgroundColor: "white" }
        }
        onClick={() => setShowGroups(false)}
      >
        Friends
      </Button>

      <Button sx={{ marginTop: "auto", color: "white" }} startIcon={<Logout />}>
        Logout
      </Button>
    </Grid>
  );
};

// Adding propTypes validation
Sidebar.propTypes = {
  showGroups: PropTypes.bool.isRequired, // showGroups is required and must be a boolean
  setShowGroups: PropTypes.func.isRequired, // setShowGroups is required and must be a function
};

export default Sidebar;
