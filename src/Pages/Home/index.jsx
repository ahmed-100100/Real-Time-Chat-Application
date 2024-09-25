import { useState } from "react";
import {
  Grid,
  Box,
  Typography,
  TextField,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton,
  Button,
  Paper,
  Drawer,
  useMediaQuery,
} from "@mui/material";
import {
  Home,
  Chat,
  Notifications,
  Settings,
  Logout,
  Phone,
  VideoCall,
  MoreVert,
  Send,
  Menu,
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

// Dummy data for last message times
const chatData = [
  {
    name: "Game Boys",
    lastMessage: "Last message preview...",
    lastTime: "9:30 PM",
  },
  {
    name: "Just Fun",
    lastMessage: "Last message preview...",
    lastTime: "8:45 PM",
  },
  {
    name: "We R Unique",
    lastMessage: "Last message preview...",
    lastTime: "7:00 PM",
  },
  {
    name: "Friendship Forever",
    lastMessage: "Last message preview...",
    lastTime: "6:20 PM",
  },
];

const messages = [
  { text: "Hey, what's up?", time: "9:45 PM", sentByUser: false },
  { text: "All good! How about you?", time: "9:46 PM", sentByUser: true },
];

const ChatApp = () => {
  const [showGroups, setShowGroups] = useState(true); // To toggle between Groups and Friends
  const [sidebarOpen, setSidebarOpen] = useState(false); // To toggle sidebar visibility
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // For mobile detection

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
                width: "240px", // Adjust width for mobile
                padding: 0,
              },
            }}
          >
            <Box
              sx={{
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
                sx={{ marginTop: 2, color: "white" }}
                onClick={() => setShowGroups(true)}
              >
                Groups
              </Button>
              <Button
                sx={{ color: "white" }}
                onClick={() => setShowGroups(false)}
              >
                Friends
              </Button>

              <Button
                sx={{ marginTop: "auto", color: "white" }}
                startIcon={<Logout />}
              >
                Logout
              </Button>
            </Box>
          </Drawer>
        ) : (
          // Persistent Sidebar for Desktop
          <Grid
            item
            xs={1} // Sidebar size on larger screens
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
              sx={{ marginTop: 2, color: "white" }}
              onClick={() => setShowGroups(true)}
            >
              Groups
            </Button>
            <Button
              sx={{ color: "white" }}
              onClick={() => setShowGroups(false)}
            >
              Friends
            </Button>

            <Button
              sx={{ marginTop: "auto", color: "white" }}
              startIcon={<Logout />}
            >
              Logout
            </Button>
          </Grid>
        )}

        {/* Groups or Friends List */}
        <Grid
          item
          xs={isMobile ? 12 : 3} // Full width of the screen on mobile
          sx={{ padding: 2, height: "100%", backgroundColor: "#E8E8E8" }}
        >
          <TextField
            fullWidth
            placeholder="Search"
            variant="outlined"
            sx={{
              marginBottom: 2,
              backgroundColor: "#ffffff",
              borderRadius: 2,
            }}
          />

          {showGroups ? (
            <>
              <Typography variant="h6" gutterBottom>
                Groups
              </Typography>
              <List>
                {chatData.map((group) => (
                  <ListItem button key={group.name}>
                    <ListItemAvatar>
                      <Avatar src="/path/to/group-image.jpg" />
                    </ListItemAvatar>
                    <ListItemText
                      primary={group.name}
                      secondary={group.lastMessage}
                    />
                    {/* Display last message time beside the message in the chat list */}
                    <Typography variant="body2" color="textSecondary">
                      {group.lastTime}
                    </Typography>
                  </ListItem>
                ))}
              </List>
            </>
          ) : (
            <>
              <Typography variant="h6" gutterBottom>
                Friends
              </Typography>
              <List>
                {chatData.map((friend) => (
                  <ListItem button key={friend.name}>
                    <ListItemAvatar>
                      <Avatar src="/path/to/friend-image.jpg" />
                    </ListItemAvatar>
                    <ListItemText
                      primary={friend.name}
                      secondary={friend.lastMessage}
                    />
                    {/* Display last message time beside the message in the chat list */}
                    <Typography variant="body2" color="textSecondary">
                      {friend.lastTime}
                    </Typography>
                  </ListItem>
                ))}
              </List>
            </>
          )}
        </Grid>

        {/* Chat Room */}
        <Grid
          item
          xs={isMobile ? 12 : 8} // Full width of screen on mobile, adjusted for desktop
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            backgroundColor: "#FAFAFA",
            padding: 0,
          }}
        >
          {/* Chat Header */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "8px 16px",
              borderBottom: "1px solid #E8E8E8",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Avatar
                alt="Chat Person"
                src="/path/to/chat-person.jpg"
                sx={{ marginRight: 2 }}
              />
              <Typography variant="h6">Bro</Typography>
              <Typography
                variant="body2"
                sx={{ marginLeft: 1, color: "#9ca3af" }}
              >
                Last seen 9:50 pm
              </Typography>
            </Box>
            <Box>
              <IconButton>
                <Phone />
              </IconButton>
              <IconButton>
                <VideoCall />
              </IconButton>
              <IconButton>
                <MoreVert />
              </IconButton>
            </Box>
          </Box>

          {/* Chat Messages */}
          <Box
            sx={{
              flex: 1,
              padding: "16px",
              display: "flex",
              flexDirection: "column",
              gap: 2,
              overflowY: "auto", // Ensure no scroll leaks, and messages fit in available space
            }}
          >
            {messages.map((message, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: message.sentByUser ? "flex-end" : "flex-start",
                }}
              >
                <Paper
                  sx={{
                    padding: 1,
                    backgroundColor: message.sentByUser ? "#5BC0BE" : "#E2E8F0",
                    color: message.sentByUser ? "black" : "#333333",
                    borderRadius: 2,
                    width: "fit-content",
                  }}
                >
                  <Typography variant="body1">{message.text}</Typography>
                </Paper>
                {/* Time of the message displayed under each message */}
                <Typography variant="caption" color="textSecondary">
                  {message.time}
                </Typography>
              </Box>
            ))}
          </Box>

          {/* Message Input */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              padding: "8px 16px",
              borderTop: "1px solid #E8E8E8",
              backgroundColor: "white",
            }}
          >
            <TextField
              fullWidth
              placeholder="Type your message here..."
              variant="outlined"
              sx={{ backgroundColor: "#f3f4f6", borderRadius: 0 }}
            />
            <IconButton>
              <Send sx={{ color: "#3A506B" }} />
            </IconButton>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ChatApp;
