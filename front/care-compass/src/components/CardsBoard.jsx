import React from 'react';
import Grid from '@mui/material/Grid';
import CaseCard from './CaseCard';

function CardsBoard({ cases }) {
  return (
    <Grid container spacing={2}>
      {cases.map((caseItem, index) => (
        <Grid 
          item 
          xs={12} // Full width on extra-small screens - one item per row
          sm={6}  // Half width on small screens - two items per row
          md={4}  // One-third width on medium screens - three items per row
          lg={3}  // One-fourth width on large screens - four items per row
          xl={2}  // One-sixth width on extra-large screens - six items per row
          key={index}
        >
          <CaseCard tags={caseItem.tags} content={caseItem.content} />
        </Grid>
      ))}
    </Grid>
  );
}

export default CardsBoard;
