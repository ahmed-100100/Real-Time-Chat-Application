import { useContext, useEffect, useState } from "react";
import { AddIcCallOutlined, GroupAddOutlined } from "@mui/icons-material";
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
const ChatList = ({ showGroups, isMobile }) => {
  const [openModal, setOpenModal] = useState(false);
  const {
    chatList,
    setChatList,
    setCurrentChatID,
    loading,
    setLoading,
    loggedUser,
    setfriendsInfo,
    friendsInfo,
  } = useContext(MainContext);
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    const getChatList = async () => {
      setLoading(true);
      await GET(
        `/api/${showGroups ? "groupChats" : "chats"}/${
          showGroups ? "userChats/all" : "userChats"
        }`
      )
        .then((response) => {
          return setChatList(response.data.data);
        })
        .finally(() => setLoading(false));
    }; // Memoizing the function based on showGroups and setChatList

    getChatList(); // Triggering only when getChatList changes
  }, [setChatList, setLoading, showGroups]); // Adding getChatList as a dependency to prevent infinite calls

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
      ) : showGroups ? (
        <>
          <Typography variant="h6" gutterBottom>
            Groups
          </Typography>
          <List>
            {Array.isArray(chatList) && chatList.length != 0 ? (
              chatList.map((group) => (
                <ListItem
                  onClick={() => {
                    setCurrentChatID(group._id);
                    setfriendsInfo(group.groupName);
                  }}
                  sx={{
                    cursor: "pointer",
                    padding: "0.5rem",
                    ":hover": { backgroundColor: "#d6d6d6" },
                  }}
                  key={group._id}
                  disablePadding
                >
                  <ListItemAvatar>
                    <Avatar src="/path/to/group-image.jpg" />
                  </ListItemAvatar>
                  <ListItemText
                    primary={group.groupName}
                    secondary={group.lastMessage?.text ?? "No messages yet"}
                  />
                  <Typography variant="body2" color="textSecondary">
                    {group.lastTime}
                  </Typography>
                </ListItem>
              ))
            ) : (
              <p>No chats Yet</p>
            )}
          </List>
        </>
      ) : (
        <>
          <Typography variant="h6" gutterBottom>
            Friends
          </Typography>
          <List>
            {Array.isArray(chatList) && chatList.length != 0 ? (
              chatList?.map((friend) => (
                <ListItem
                  onClick={() => {
                    console.log(friend._id);
                    setCurrentChatID(friend._id);
                    setfriendsInfo(
                      friend.participants?.find(
                        (friend) => friend._id !== loggedUser?._id
                      )?.name
                    );
                  }}
                  sx={{
                    cursor: "pointer",
                    padding: "0.5rem",
                    ":hover": { backgroundColor: "#d6d6d6" },
                  }}
                  key={friend._id}
                  disablePadding
                >
                  <ListItemAvatar>
                    <Avatar src="/path/to/friend-image.jpg" />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      friend.participants?.find(
                        (friend) => friend._id !== loggedUser?._id
                      )?.name
                    }
                    secondary={friend?.lastMessage?.text ?? "no messages yet"}
                  />
                  <Typography variant="body2" color="textSecondary">
                    {friend.lastTime}
                  </Typography>
                </ListItem>
              ))
            ) : (
              <p>No Chats Yet</p>
            )}
          </List>
        </>
      )}

      {/* Conditionally render different buttons */}
      {showGroups ? (
        <Button
          variant="contained"
          sx={{
            borderRadius: "50%",
            minWidth: "50px",
            minHeight: "50px",
            backgroundColor: "#3A506B",
            ":hover": {
              color: "black",
              backgroundColor: "#E8E8E8",
            },
            position: "absolute",
            bottom: "1rem",
            right: "1rem",
          }}
          onClick={handleOpenModal}
        >
          <GroupAddOutlined />
        </Button>
      ) : (
        <Button
          variant="contained"
          sx={{
            borderRadius: "50%",
            minWidth: "50px",
            minHeight: "50px",
            backgroundColor: "#3A506B",
            ":hover": {
              color: "black",
              backgroundColor: "#E8E8E8",
            },
            position: "absolute",
            bottom: "1rem",
            right: "1rem",
          }}
          onClick={handleOpenModal}
        >
          <AddIcCallOutlined />
        </Button>
      )}

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
