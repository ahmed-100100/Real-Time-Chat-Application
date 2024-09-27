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
} from "@mui/material";
import PropTypes from "prop-types";
import CustomModal from "./CustomModal";
import { GET } from "../../../api/axios";
import { MainContext } from "../../../Contexts/MainContext";

const ChatList = ({ showGroups, isMobile }) => {
  const [openModal, setOpenModal] = useState(false);
  const { chatList, setChatList, setCurrentChatID } = useContext(MainContext);
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    const getChatList = async () => {
      await GET(
        `/api/${showGroups ? "groupChats" : "chats"}/${
          showGroups ? "userChats/all" : "userChats"
        }`
      ).then((response) => {
        return setChatList(response.data.data);
      });
    }; // Memoizing the function based on showGroups and setChatList

    getChatList(); // Triggering only when getChatList changes
  }, [setChatList, showGroups]); // Adding getChatList as a dependency to prevent infinite calls

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

      {showGroups ? (
        <>
          <Typography variant="h6" gutterBottom>
            Groups
          </Typography>
          <List>
            {Array.isArray(chatList) &&
              chatList.map((group) => (
                <ListItem
                  button
                  onClick={() => {
                    console.log(group._id);
                    setCurrentChatID(group._id);
                  }}
                  key={group._id}
                  disablePadding
                >
                  <ListItemAvatar>
                    <Avatar src="/path/to/group-image.jpg" />
                  </ListItemAvatar>
                  <ListItemText
                    primary={group.groupName}
                    secondary={group.lastMessage}
                  />
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
            {Array.isArray(chatList) &&
              chatList?.map((friend) => (
                <ListItem
                  onClick={() => {
                    console.log(friend._id);
                    setCurrentChatID(friend._id);
                  }}
                  button
                  key={friend._id}
                  disablePadding
                >
                  <ListItemAvatar>
                    <Avatar src="/path/to/friend-image.jpg" />
                  </ListItemAvatar>
                  <ListItemText
                    primary={friend.name}
                    secondary={friend?.lastMessage?.text ?? "no messages yet"}
                  />
                  <Typography variant="body2" color="textSecondary">
                    {friend.lastTime}
                  </Typography>
                </ListItem>
              ))}
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
      <CustomModal
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
