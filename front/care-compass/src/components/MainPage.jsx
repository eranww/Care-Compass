import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TagsArea from './TagsArea'; // Make sure to import your TagsArea component
import CaseCard from './CaseCard'; // Make sure to import your CaseCard component

function MainPage() {
    // Example tags and cases data
    const tags = ["React", "JavaScript", "Node.js"];
    const cases = [
        { id: 1, tags: ["HTML", "CSS"], content: "Example content for case 1..." },
        { id: 2, tags: ["React", "Hooks"], content: "Example content for case 2..." },
        { id: 3, tags: ["Node.js", "Express"], content: "Example content for case 3..." },
        // Add more cases as needed
    ];

    // Dummy functions for handling events
    const handleFileUpload = (event) => {
        console.log(event.target.files);
        // Add your file handling logic here
    };

    const handleSearch = () => {
        console.log("Search executed");
        // Add your search handling logic here
    };
    return ( 
        <Box sx={{
            Width: '90vw', // Limits the maximum width
            height: '100vh',
            margin: 'auto', // Centers the box in the available horizontal space
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center' // Ensures that children align in the center when smaller than the box's width
        }}>
            <Paper sx={{ padding: 2, marginBottom: 2, width: '100%' }}>
                <Typography variant="h5" gutterBottom>Tags Area</Typography>
                <TagsArea tags={tags} />
                <Button variant="contained" component="label" sx={{ marginTop: 2 }}>
                    Upload Text
                    <input type="file" hidden onChange={handleFileUpload} />
                </Button>
                <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 2, width: '100%' }}>
                    <TextField fullWidth label="Search" variant="outlined" />
                    <Button variant="contained" onClick={handleSearch} sx={{ marginLeft: 2 }}>Search</Button>
                </Box>
            </Paper>
            <Grid container spacing={2} sx={{ width: '100%', overflow: 'auto' }}>
                {cases.map((caseItem, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <CaseCard tags={caseItem.tags} content={caseItem.content} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

export default MainPage;
