import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

// Sample email data
const emailList = [
  { email: "john.doe@example.com" },
  { email: "jane.smith@example.com" },
  { email: "will.brown@example.com" },
  { email: "susan.jones@example.com" },
];

export default function ComboBox() {
  return (
    <Autocomplete
      disablePortal
      options={emailList}
      getOptionLabel={(option) => option.email}
      sx={{
        width: '100%',
        '& .MuiAutocomplete-endAdornment': { display: 'none' }, // Remove the arrow
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Enter Email"
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            style: { paddingRight: 0 }, // Remove padding for dropdown arrow
          }}
        />
      )}
    />
  );
}
