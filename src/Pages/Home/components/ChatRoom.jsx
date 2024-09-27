import {
  Box,
  Grid,
  Typography,
  Avatar,
  IconButton,
  Paper,
  Menu,
  MenuItem,
} from "@mui/material";
import { Phone, VideoCall, MoreVert } from "@mui/icons-material";
import MessageInput from "./MessageInput";
import PropTypes from "prop-types"; // Importing PropTypes for prop validation
import { useState } from "react";
import { DELETE } from "../../../api/axios";

// Dummy messages
const messages = [
  { text: "Hey, what's up?", time: "9:45 PM", sentByUser: false },
  { text: "All good! How about you?", time: "9:46 PM", sentByUser: true },
];

const ChatRoom = ({ isMobile, allMessage, UserProfile, setAllMessage }) => {
  const [MessageId, setMessageId] = useState(null);
  const userId = UserProfile._id;
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event, messageId) => {
    setAnchorEl(event.currentTarget);
    setMessageId(messageId);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setMessageId(null);
  };
  const handleClickDelete = () => {
    DELETE(`/api/messages/delete/${MessageId}`)
      .then((res) => {
        const deletedMessage = res.data.data;
        const newMessages = [...allMessage].filter(
          (message) => message._id !== deletedMessage._id
        );
        setAllMessage(newMessages);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
        {allMessage.map((message, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems:
                message.sender._id == userId ? "flex-end" : "flex-start",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {message.sender._id == userId ? (
                <MoreVert
                  onClick={(event) => handleClick(event, message._id)}
                  style={{ cursor: "pointer" }}
                />
              ) : (
                <></>
              )}
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem
                  onClick={() => {
                    console.log(MessageId);
                    handleClickDelete();
                    handleClose();
                  }}
                >
                  Delete
                </MenuItem>
              </Menu>
              <Paper
                sx={{
                  padding: 1,
                  backgroundColor:
                    message.sender._id == userId ? "#5BC0BE" : "#E2E8F0",
                  color: message.sender._id == userId ? "black" : "#333333",
                  borderRadius: 2,
                  width: "fit-content",
                }}
              >
                <Typography variant="body1">{message.text}</Typography>
              </Paper>
            </Box>
            <Typography variant="caption" color="textSecondary">
              {"0"}
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
