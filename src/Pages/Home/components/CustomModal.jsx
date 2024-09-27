import { Modal } from '@mui/base/Modal';
import { IconButton, Typography, Button, Box, TextField, Autocomplete } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import PropTypes from 'prop-types';

// Dummy data for the email list
const emailList = [
  { email: "john.doe@example.com" },
  { email: "jane.smith@example.com" },
  { email: "will.brown@example.com" },
  { email: "susan.jones@example.com" },
];

const CustomModal = ({ open, handleClose, showGroups }) => {
  return (
    <Modal
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      open={open}
      onClose={handleClose}
    >
      <div
        style={{
          color: 'white',
          backgroundColor: '#3A506B',
          padding: '20px',
          borderRadius: '8px',
          textAlign: 'center',
          maxWidth: '500px',
          margin: 'auto',
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        }}
      >
        {/* Close icon in top-right corner */}
        <IconButton
          onClick={handleClose}
          sx={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            color: 'white',
          }}
        >
          <CloseIcon />
        </IconButton>

        <Typography variant="h4" id="modal-title" sx={{ margin: '30px' }}>
          {showGroups ? "Create New Group" : "Add Friends By Email"}
        </Typography>

        {showGroups ? (
          // "Create Group" modal
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <TextField
              label="Enter Group Name"
              variant="outlined"
              sx={{
                width: '100%',
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'white',
                  '&.Mui-focused fieldset': { borderColor: '#222' },
                },
                '& .MuiInputLabel-root': { color: '#222' },
              }}
            />
            <Autocomplete
              multiple
              disablePortal
              options={emailList}
              getOptionLabel={(option) => option.email}
              sx={{
                width: '100%',
                mt: 1,
                '& .MuiAutocomplete-endAdornment': { display: 'none' },
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Add Members"
                  variant="outlined"
                  InputProps={{
                    ...params.InputProps,
                    style: { paddingRight: 0 },
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: 'white',
                      '&.Mui-focused fieldset': { borderColor: '#222' },
                    },
                    '& .MuiInputLabel-root': { color: '#222' },
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
                alignSelf: 'center',
              }}
            >
              Create Group
            </Button>
          </Box>
        ) : (
          // "Add Friend" modal
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Autocomplete
              disablePortal
              options={emailList}
              getOptionLabel={(option) => option.email}
              sx={{
                width: '100%',
                '& .MuiAutocomplete-endAdornment': { display: 'none' },
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Enter Email"
                  variant="outlined"
                  InputProps={{
                    ...params.InputProps,
                    style: { paddingRight: 0 },
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: 'white',
                      '&.Mui-focused fieldset': { borderColor: '#222' },
                    },
                    '& .MuiInputLabel-root': { color: '#222' },
                  }}
                />
              )}
            />

            <Button
              variant="contained"
              color="inherit"
              sx={{
                mt: 2,
                alignSelf: 'center',
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
