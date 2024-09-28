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
      {showGroups ? (
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
          <MenuItem onClick={() => handleMenuItemClick("add")}>
            Add Member
          </MenuItem>
          <MenuItem onClick={() => handleMenuItemClick("clear")}>
            Clear Chat
          </MenuItem>
          <MenuItem onClick={() => handleMenuItemClick("exit")}>
            Exit Group
          </MenuItem>
        </Menu>
      ) : (
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
          <MenuItem onClick={""}>
            View Profile
          </MenuItem>
          <MenuItem onClick={() => handleMenuItemClick("clear")}>
            Clear Chat
          </MenuItem>
          <MenuItem onClick={() => handleMenuItemClick("block")}>
            Block User
          </MenuItem>
        </Menu>
      )}
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
