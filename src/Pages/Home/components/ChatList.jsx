import { useState } from "react";
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
import CustomModal from './CustomModal';

// Dummy data for chat groups/friends
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

const ChatList = ({ showGroups, isMobile }) => {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

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
            {chatData.map((group) => (
              <ListItem button key={group.name} disablePadding>
                <ListItemAvatar>
                  <Avatar src="/path/to/group-image.jpg" />
                </ListItemAvatar>
                <ListItemText
                  primary={group.name}
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
            {chatData.map((friend) => (
              <ListItem button key={friend.name} disablePadding>
                <ListItemAvatar>
                  <Avatar src="/path/to/friend-image.jpg" />
                </ListItemAvatar>
                <ListItemText
                  primary={friend.name}
                  secondary={friend.lastMessage}
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
      <CustomModal open={openModal} handleClose={handleCloseModal} showGroups={showGroups} />
    </Grid>
  );
};

// Adding propTypes validation
ChatList.propTypes = {
  showGroups: PropTypes.bool.isRequired,
  isMobile: PropTypes.bool.isRequired,
};

export default ChatList;
