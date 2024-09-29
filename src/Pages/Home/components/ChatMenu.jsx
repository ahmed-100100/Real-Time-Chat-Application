import { Menu, MenuItem } from "@mui/material";
import PropTypes from "prop-types";
import { useState } from "react";
import ChatMenuModal from "./ChatMenuModal";

const ChatMenu = ({ anchorEl, handleClose, showGroups }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [actionType, setActionType] = useState("add");

  const handleMenuItemClick = (action) => {
    setActionType(action);
    setModalOpen(true);
    handleClose();
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        {showGroups
          ? [
              <MenuItem key="add" onClick={() => handleMenuItemClick("add")}>
                Add Member
              </MenuItem>,
              <MenuItem
                key="clear"
                onClick={() => handleMenuItemClick("clear")}
              >
                Clear Chat
              </MenuItem>,
              <MenuItem key="exit" onClick={() => handleMenuItemClick("exit")}>
                Exit Group
              </MenuItem>,
            ]
          : [<MenuItem key="view-profile">View Profile</MenuItem>]}
      </Menu>

      <ChatMenuModal
        open={modalOpen}
        handleClose={handleModalClose}
        showGroups={showGroups}
        actionType={actionType}
      />
    </>
  );
};

ChatMenu.propTypes = {
  showGroups: PropTypes.bool.isRequired,
  anchorEl: PropTypes.object,
  handleClose: PropTypes.func.isRequired,
};

export default ChatMenu;
