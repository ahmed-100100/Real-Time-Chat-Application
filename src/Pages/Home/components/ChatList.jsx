import { useContext, useEffect, useState } from "react";
import { Add } from "@mui/icons-material";
import {
  Grid,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  TextField,
  Button,
  CircularProgress,
  Box,
} from "@mui/material";
import PropTypes from "prop-types";
import ChatListModal from "./ChatListModal";
import { GET } from "../../../api/axios";
import { MainContext } from "../../../Contexts/MainContext";
import dayjs from "dayjs";
import { getNameInitials } from "../../../utils/helpers/getNameInitials";
import { stringToColor } from "../../../utils/helpers/getColorFromString";
const ChatList = ({ showGroups, isMobile }) => {
  const [openModal, setOpenModal] = useState(false);
  const {
    chatList,
    setChatList,
    setCurrentChat,
    loading,
    setLoading,
    currentChat,
    loggedUser,
  } = useContext(MainContext);
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    if (chatList[showGroups ? "groupChats" : "chats"]) return;
    const getChatList = async () => {
      setLoading(true);
      await GET(
        `/api/${showGroups ? "groupChats" : "chats"}/${
          showGroups ? "userChats/all" : "userChats"
        }`
      )
        .then((response) => {
          return setChatList((prev) => ({
            ...prev,
            [showGroups ? "groupChats" : "chats"]: response.data.data,
          }));
        })
        .finally(() => setLoading(false));
    }; // Memoizing the function based on showGroups and setChatList

    getChatList(); // Triggering only when getChatList changes
  }, [chatList, setChatList, setLoading, showGroups]); // Adding getChatList as a dependency to prevent infinite calls

  return (
    <Grid
      item
      xs={isMobile ? 12 : 3}
      sx={{
        padding: 2,
        height: "100%",
        backgroundColor: "#E8E8E8",
        position: "relative",
      }}
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

      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="80%" // Adjust if you want it to take the full height of the parent
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Typography variant="h6" gutterBottom>
            Groups
          </Typography>
          <List>
            {Array.isArray(chatList?.[showGroups ? "groupChats" : "chats"]) &&
            chatList?.[showGroups ? "groupChats" : "chats"]?.length != 0 ? (
              chatList?.[showGroups ? "groupChats" : "chats"]?.map((chat) => {
                const name = showGroups
                  ? chat.groupName
                  : chat.participants?.find(
                      (participant) => participant._id !== loggedUser._id
                    ).name;
                return (
                  <ListItem
                    onClick={() => {
                      setCurrentChat(chat);
                    }}
                    sx={{
                      cursor: "pointer",
                      padding: "0 0.5rem",
                      ":hover": { backgroundColor: "#d6d6d6" },
                      bgcolor: `${currentChat._id == chat._id && "#d6d6d6"}`,
                    }}
                    key={chat._id}
                    disablePadding
                  >
                    <ListItemAvatar>
                      <Avatar
                        sx={{
                          bgcolor: `${stringToColor(name)}`,
                        }}
                      >
                        {getNameInitials(name)}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={name}
                      secondary={chat.lastMessage?.text ?? "No messages yet"}
                    />
                    <Typography variant="body2" color="textSecondary">
                      {dayjs(chat.lastMessage?.createdAt).format("hh:mm A")}
                    </Typography>
                  </ListItem>
                );
              })
            ) : (
              <p>No chats Yet</p>
            )}
          </List>
        </>
      )}

      {/* Conditionally render different buttons */}

      <Button
        variant="contained"
        sx={{
          width: "50px", // Ensure width and height are equal
          height: "50px",
          minWidth: "50px", // Prevent the button from shrinking
          minHeight: "50px",
          borderRadius: "50%", // Ensures it's round
          backgroundColor: "#3A506B",
          display: "flex", // Center the icon inside
          justifyContent: "center", // Horizontally center the icon
          alignItems: "center", // Vertically center the icon
          boxShadow: "0px 1px 10px rgba(0, 0, 0, 0.2)", // Floating shadow effect
          ":hover": {
            color: "black",
            backgroundColor: "#E8E8E8",
            boxShadow: "0px 1px 10px rgba(0, 0, 0, 0.3)", // Slightly stronger shadow on hover
          },
          position: "absolute",
          bottom: "1rem",
          right: "1rem",
        }}
        onClick={handleOpenModal}
      >
        <Add />
      </Button>

      {/* Custom Modal component */}
      <ChatListModal
        open={openModal}
        handleClose={handleCloseModal}
        showGroups={showGroups}
      />
    </Grid>
  );
};

// Adding propTypes validation
ChatList.propTypes = {
  showGroups: PropTypes.bool.isRequired,
  isMobile: PropTypes.bool.isRequired,
};

export default ChatList;
