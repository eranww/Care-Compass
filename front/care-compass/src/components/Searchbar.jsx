import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

function SearchInput({ onSearch }) {
  const [input, setInput] = useState('');

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const handleSubmit = () => {
    onSearch(input);
  };

  return (
    <Box display="flex" gap={2} alignItems="center">
      <TextField
        multiline
        rows={4}
        variant="outlined"
        placeholder="Enter your search..."
        value={input}
        onChange={handleChange}
        fullWidth
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Search
      </Button>
    </Box>
  );
}

export default SearchInput;
