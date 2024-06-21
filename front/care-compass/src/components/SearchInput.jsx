import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

function SearchInput({ onSearch }) {
  const [input, setInput] = useState('');

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const handleSubmit = async () => {
    if (input.trim() !== '') {
      try {
        const result = await getSimilarCasesFromShortText(input);
        onSearch(result);  // Assuming onSearch will handle the result
      } catch (error) {
        console.error('Failed to fetch similar cases:', error);
      }
    }
  };

  async function getSimilarCasesFromShortText(text) {
    const response = await fetch('/api/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text })
    });
  
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
  
    return await response.json();// reuturn the similar cases: case_id, content of case, counter of shared tags, list of shared tags names.
  }

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
