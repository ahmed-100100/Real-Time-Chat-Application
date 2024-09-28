import { Modal } from "@mui/base/Modal";
import {
  IconButton,
  Typography,
  Button,
  Box,
  TextField,
  Autocomplete,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { GET } from "../../../api/axios";

const CustomModal = ({ open, handleClose, showGroups }) => {
  const [email, setEmail] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedEmails, setSelectedEmails] = useState([]);

  useEffect(() => {
    if (!query.trim()) {
      setEmail([]);
      return;
    }
    const debounceTimeout = setTimeout(() => {
      fetchSuggestions(query);
    }, 2000);
    return () => clearTimeout(debounceTimeout);
  }, [query]);

  async function fetchSuggestions(searchQuery) {
    setLoading(true);
    const response = await GET(`/api/users/search/${searchQuery}`);
    if (!response.data.success || response.data.data.length === 0) {
      setEmail([]);
      return;
    }
    setEmail(response.data.data);
  }

  const handleSearch = (event) => {
    setQuery(event.target.value);
  };

  const handleSelect = (event, value) => {
    setSelectedEmails(value);
  };
  const handleCreateGroup = () => {
    const selectedIds = selectedEmails.map((email) => email._id);
    console.log("Selected User IDs:", selectedIds);
  };

  return (
    <Modal
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      open={open}
      onClose={handleClose}
    >
      <div
        style={{
          color: "white",
          backgroundColor: "#3A506B",
          padding: "20px",
          borderRadius: "8px",
          textAlign: "center",
          maxWidth: "500px",
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

        <Typography variant="h4" id="modal-title" sx={{ margin: "30px" }}>
          {showGroups ? "Create New Group" : "Add Friends By Email"}
        </Typography>

        {showGroups ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <TextField
              label="Enter Group Name"
              variant="outlined"
              onChange={handleSearch}
              sx={{
                width: "100%",
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "white",
                  "&.Mui-focused fieldset": { borderColor: "#222" },
                },
                "& .MuiInputLabel-root": { color: "#222" },
              }}
            />
            <Autocomplete
              multiple
              disablePortal
              options={email}
              getOptionLabel={(option) => option.email}
              loading={loading}
              onChange={handleSelect}
              sx={{
                width: "100%",
                mt: 1,
                "& .MuiAutocomplete-endAdornment": { display: "none" },
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Add Members"
                  variant="outlined"
                  value={query}
                  onChange={handleSearch}
                  InputProps={{
                    ...params.InputProps,
                    style: { paddingRight: 0 },
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "white",
                      "&.Mui-focused fieldset": { borderColor: "#222" },
                    },
                    "& .MuiInputLabel-root": { color: "#222" },
                    mt: 2,
                  }}
                />
              )}
            />

            <Button
              variant="contained"
              color="inherit"
              sx={{
                mt: 4,
                alignSelf: "center",
              }}
              onClick={handleCreateGroup}
            >
              Create Group
            </Button>
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Autocomplete
              disablePortal
              options={email}
              getOptionLabel={(option) => option.email}
              loading={loading}
              sx={{
                width: "100%",
                "& .MuiAutocomplete-endAdornment": { display: "none" },
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Enter Email"
                  variant="outlined"
                  value={query}
                  onChange={handleSearch}
                  InputProps={{
                    ...params.InputProps,
                    style: { paddingRight: 0 },
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "white",
                      "&.Mui-focused fieldset": { borderColor: "#222" },
                    },
                    "& .MuiInputLabel-root": { color: "#222" },
                  }}
                />
              )}
            />

            <Button
              variant="contained"
              color="inherit"
              sx={{
                mt: 2,
                alignSelf: "center",
              }}
            >
              Add Chat
            </Button>
          </Box>
        )}
      </div>
    </Modal>
  );
};

// Adding propTypes validation
CustomModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  showGroups: PropTypes.bool.isRequired,
};

export default CustomModal;
