import { useState } from "react";
import { AddIcCallOutlined, Close as CloseIcon } from "@mui/icons-material";
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
  IconButton,
} from "@mui/material";
import { Modal } from "@mui/base/Modal";
import PropTypes from "prop-types";
import ComboBox from "./ComboBox"; // Import the ComboBox

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

      {/* Button to open the modal */}
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

      {/* MUI Modal */}
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        open={openModal}
        onClose={handleCloseModal}
      >
        <div
          style={{
            color: "white",
            backgroundColor: "#3A506B",
            padding: "20px",
            borderRadius: "8px",
            textAlign: "center",
            maxWidth: "500px", // Increase modal width
            margin: "auto",
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          }}
        >
          {/* Close icon in top-right corner */}
          <IconButton
            onClick={handleCloseModal}
            sx={{
              position: "absolute",
              top: "10px",
              right: "10px",
              color: "white",
            }}
          >
            <CloseIcon />
          </IconButton>

          <h2 id="modal-title" style={{ margin: "30px" }}>
            Add Friends By Email
          </h2>

          {/* ComboBox for email search */}
          <ComboBox />
        </div>
      </Modal>
    </Grid>
  );
};

// Adding propTypes validation
ChatList.propTypes = {
  showGroups: PropTypes.bool.isRequired,
  isMobile: PropTypes.bool.isRequired,
};

export default ChatList;
