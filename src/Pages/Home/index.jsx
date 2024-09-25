import { useState } from "react";
import { Grid, Box, IconButton, Drawer, useMediaQuery } from "@mui/material";
import { Menu } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import Sidebar from "./components/Sidebar";
import ChatList from "./components/Chatlist";
import ChatRoom from "./components/Chatroom";

const ChatApp = () => {
  const [showGroups, setShowGroups] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Box sx={{ height: "100vh", backgroundColor: "#FAFAFA", display: "flex" }}>
      <Grid container sx={{ height: "100%", width: "100%", margin: 0 }}>
        {/* Toggle Button for Mobile */}
        {isMobile && (
          <IconButton
            onClick={toggleSidebar}
            sx={{ position: "absolute", top: 10, left: 10, zIndex: 1300 }}
          >
            <Menu sx={{ color: "#3A506B" }} />
          </IconButton>
        )}

        {/* Sidebar for Mobile */}
        {isMobile ? (
          <Drawer
            anchor="left"
            open={sidebarOpen}
            onClose={toggleSidebar}
            variant="temporary"
            sx={{
              "& .MuiDrawer-paper": {
                backgroundColor: "#3A506B",
                color: "white",
                width: "240px",
                padding: 0,
              },
            }}
          >
            <Sidebar showGroups={showGroups} setShowGroups={setShowGroups} />
          </Drawer>
        ) : (
          <Sidebar showGroups={showGroups} setShowGroups={setShowGroups} />
        )}

        {/* Groups or Friends List */}
        <ChatList showGroups={showGroups} isMobile={isMobile} />

        {/* Chat Room */}
        <ChatRoom isMobile={isMobile} />
      </Grid>
    </Box>
  );
};

export default ChatApp;
