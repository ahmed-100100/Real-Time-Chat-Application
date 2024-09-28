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
import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import { DELETE, GET, POST } from "../../../api/axios";
import { MainContext } from "../../../Contexts/MainContext";
import ChatMenu from "./ChatMenu";

const ChatRoom = ({ isMobile, showGroups }) => {
  const [newMessage, setNewMessage] = useState("");
  const [MessageId, setMessageId] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [chatMenuAnchorEl, setChatMenuAnchorEl] = useState(null);

  const { currentChatID, loggedUser, allMessage, setAllMessage, friendsInfo } =
    useContext(MainContext);

  const handleClick = (event, messageId) => {
    setAnchorEl(event.currentTarget);
    setMessageId(messageId);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setMessageId(null);
  };

  const handleChatMenuClick = (event) => {
    setChatMenuAnchorEl(event.currentTarget);
  };
  const handleChatMenuClose = () => {
    setChatMenuAnchorEl(null);
  };

  const handleClickDelete = () => {
    DELETE(`/api/messages/delete/${MessageId}`)
      .then((res) => {
        const deletedMessage = res.data.data;
        const newMessages = [...allMessage[currentChatID]].filter(
          (message) => message._id !== deletedMessage._id
        );
        setAllMessage(newMessages);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;

    const messageData = {
      text: newMessage,
    };

    POST(`/api/messages/${currentChatID}`, messageData)
      .then((res) => {
        setAllMessage((prev) => ({
          ...prev,
          [currentChatID]: [...(prev[currentChatID] || []), res.data.data],
        }));
        setNewMessage("");
      })
      .catch((err) => {
        console.error("Error sending message:", err);
      });
  };

  useEffect(() => {
    const getMessage = () => {
      GET(`/api/messages/${currentChatID}`)
        .then((res) => {
          setAllMessage((prev) => ({
            ...prev,
            [currentChatID]: res.data.data,
          }));
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getMessage();
  }, [currentChatID, setAllMessage]);

  return currentChatID ? (
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
          <Typography variant="h6">{friendsInfo}</Typography>
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
          <IconButton onClick={handleChatMenuClick}>
            <MoreVert />
          </IconButton>
          <ChatMenu
            anchorEl={chatMenuAnchorEl}
            handleClick={handleChatMenuClick}
            handleClose={handleChatMenuClose}
            showGroups={showGroups}
          />
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
          overflowY: "auto",
        }}
      >
        {allMessage?.[currentChatID]?.map((message, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems:
                message.sender._id === loggedUser?._id ? "flex-end" : "flex-start",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {message.sender._id === loggedUser?._id && (
                <IconButton onClick={(event) => handleClick(event, message._id)}>
                  <MoreVert style={{ cursor: "pointer" }} />
                </IconButton>
              )}
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem
                  onClick={() => {
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
                    message.sender._id === loggedUser?._id ? "#5BC0BE" : "#E2E8F0",
                  color: message.sender._id === loggedUser?._id ? "black" : "#333333",
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

      {/* Message Input */}
      <MessageInput
        message={newMessage}
        setMessage={setNewMessage}
        onSend={handleSendMessage}
      />
    </Grid>
  ) : (
    <Grid
      item
      xs={isMobile ? 12 : 8} // Set to 12 to take the full width
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        backgroundColor: "#FAFAFA",
        padding: 0,
      }}
    >
      <p>No chat selected</p>
    </Grid>
  );
};

ChatRoom.propTypes = {
  isMobile: PropTypes.bool.isRequired,
  showGroups: PropTypes.bool.isRequired,
  allMessage: PropTypes.array,
  setAllMessage: PropTypes.func,
};

export default ChatRoom;
