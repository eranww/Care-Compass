import React from 'react';
import { Chip } from '@mui/material';

function stringToColor(string) {
  let hash = 0;
  for (let i = 0; i < string.length; i++) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = '#';
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xFF;
    color += ('00' + value.toString(16)).substr(-2);
  }
  return color;
}

function Tag({ label }) {
  const color = stringToColor(label);
  return (
    <Chip label={label} style={{ backgroundColor: color, color: 'white' }} />
  );
}

export default Tag;
