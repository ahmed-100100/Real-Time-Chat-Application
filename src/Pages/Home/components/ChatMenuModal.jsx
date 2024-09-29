import { Modal } from "@mui/base/Modal";
import { IconButton, Typography, Button, Box, TextField } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import PropTypes from "prop-types";
import { useCallback, useEffect, useRef, useState } from "react";

const actionDetails = {
  clear: {
    title: "Are You Sure You Want To Clear The Chat?",
    message: "All messages will be deleted",
    showEmail: false,
  },
  block: {
    title: "Are You Sure You Want To Block This User?",
    message: "Blocked users cannot call or send you messages",
    showEmail: false,
  },
  add: { title: "Add Member", message: "", showEmail: true },
  exit: {
    title: "Are You Sure You Want To Exit This Group?",
    message:
      "You will not be able to send or receive any messages on this group",
    showEmail: false,
  },
};

const ChatMenuModal = ({ open, handleClose, actionType }) => {
  const [email, setEmail] = useState("");

  const { title, message, showEmail } = actionDetails[actionType];
  const modalRef = useRef(null);

  const handleConfirm = () => {
    // Logic to handle each action (API calls can be added here)
    console.log(actionType, { email });
    handleClose(); // Close modal after confirmation
  };

  const handleClickOutside = useCallback(
    (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        handleClose();
      }
    },
    [handleClose]
  );

  useEffect(() => {
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, handleClickOutside]);

  return (
    <Modal open={open} onClose={handleClose}>
      <div
        ref={modalRef}
        style={{
          width: "100%",
          color: "white",
          backgroundColor: "#3A506B",
          padding: "20px",
          borderRadius: "8px",
          textAlign: "center",
          maxWidth: "400px",
          margin: "auto",
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <IconButton
          onClick={handleClose}
          sx={{
            position: "absolute",
            top: "10px",
            right: "10px",
            color: "white",
          }}
        >
          <CloseIcon />
        </IconButton>
        <Typography variant="h5" sx={{ margin: "20px" }}>
          {title}
        </Typography>
        {message && (
          <Typography variant="body1" sx={{ mb: 2 }}>
            {message}
          </Typography>
        )}
        {showEmail && (
          <TextField
            label="Email Address"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                backgroundColor: "white",
                "&.Mui-focused fieldset": { borderColor: "#222" },
              },
              "& .MuiInputLabel-root": { color: "#222" },
            }}
          />
        )}
        {showEmail ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Button variant="contained" color="inherit" onClick={handleConfirm}>
              Add
            </Button>
          </Box>
        ) : (
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <Button variant="contained" color="inherit" onClick={handleConfirm}>
              Yes, Confirm
            </Button>
            <Button variant="outlined" color="inherit" onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        )}
      </div>
    </Modal>
  );
};

// PropTypes validation
ChatMenuModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  actionType: PropTypes.oneOf(["add", "clear", "block", "exit"]).isRequired,
};

export default ChatMenuModal;
