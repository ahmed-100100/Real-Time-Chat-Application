import {
  Box,
  Grid,
  Typography,
  Avatar,
  IconButton,
  Paper,
} from "@mui/material";
import { Phone, VideoCall, MoreVert } from "@mui/icons-material";
import MessageInput from "./MessageInput";
import PropTypes from "prop-types"; // Importing PropTypes for prop validation

// Dummy messages
const messages = [
  { text: "Hey, what's up?", time: "9:45 PM", sentByUser: false },
  { text: "All good! How about you?", time: "9:46 PM", sentByUser: true },
];

const ChatRoom = ({ isMobile, Allmessage, UserProfile }) => {
  const Userid = UserProfile._id;
  return (
    <Grid
      item
      xs={isMobile ? 12 : 8} // Set to 12 to take the full width
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        backgroundColor: "#FAFAFA",
        padding: 0,
      }}
    >
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
          <Typography variant="body2" sx={{ marginLeft: 1, color: "#9ca3af" }}>
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

      <Box
        sx={{
          flex: 1,
          padding: "16px",
          display: "flex",
          flexDirection: "column",
          gap: 2,
          overflowY: "auto",
        }}
      >
        {Allmessage.map((message, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems:
                message.sender._id == Userid ? "flex-end" : "flex-start",
            }}
          >
            <Paper
              sx={{
                padding: 1,
                backgroundColor:
                  message.sender._id == Userid ? "#5BC0BE" : "#E2E8F0",
                color: message.sender._id == Userid ? "black" : "#333333",
                borderRadius: 2,
                width: "fit-content",
              }}
            >
              <Typography variant="body1">{message.text}</Typography>
            </Paper>
            <Typography variant="caption" color="textSecondary">
              {message.createdAt}
            </Typography>
          </Box>
        ))}
      </Box>
      <MessageInput />
    </Grid>
  );
};

ChatRoom.propTypes = {
  isMobile: PropTypes.bool.isRequired, // isMobile is required and must be a boolean
};

export default ChatRoom;
