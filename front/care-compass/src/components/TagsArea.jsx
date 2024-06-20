// TagsArea.jsx
import React from 'react';
import Box from '@mui/material/Box';
import Tag from './Tag'; // Import the Tag component

function TagsArea({ tags }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        padding: 1,
        border: '1px solid #ccc',
        borderRadius: '4px',
        gap: '10px'
      }}
    >
      {tags.map((tag, index) => (
        <Tag key={index} label={tag} />
      ))}
    </Box>
  );
}

export default TagsArea;
