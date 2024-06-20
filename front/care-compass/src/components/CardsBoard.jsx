import React from 'react';
import Grid from '@mui/material/Grid';
import CaseCard from './CaseCard'; // Assuming CaseCard is another component

function Board({ cases }) {
  return (
    <Grid container spacing={2}>
      {cases.map((caseItem, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <CaseCard tags={caseItem.tags} content={caseItem.content} />
        </Grid>
      ))}
    </Grid>
  );
}

export default Board;
