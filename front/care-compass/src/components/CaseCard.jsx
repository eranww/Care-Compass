import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Tag from './Tag'; // Assuming Tag is another component

function CaseCard({ tags, content }) {
  return (
    <Card>
      <CardContent>
        <div style={{ marginBottom: '1rem' }}>
          {tags.map((tag, index) => <Tag key={index} label={tag} />)}
        </div>
        <Typography variant="body2" color="text.secondary">
          {content.substring(0, 100)}...
        </Typography>
      </CardContent>
    </Card>
  );
}

export default CaseCard;
