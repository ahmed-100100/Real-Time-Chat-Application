import { Box, TextField, IconButton } from "@mui/material";
import { Send } from "@mui/icons-material";

const MessageInput = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        padding: "8px 16px",
        borderTop: "1px solid #E8E8E8",
        backgroundColor: "white",
      }}
    >
      <TextField
        fullWidth
        placeholder="Type your message here..."
        variant="outlined"
        sx={{ backgroundColor: "#f3f4f6", borderRadius: 0 }}
      />
      <IconButton>
        <Send sx={{ color: "#3A506B" }} />
      </IconButton>
    </Box>
  );
};

export default MessageInput;
