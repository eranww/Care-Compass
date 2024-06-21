import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TagsArea from './TagsArea'; // Make sure to import your TagsArea component
import CaseCard from './CaseCard'; // Make sure to import your CaseCard component
import CardsBoard from './CardsBoard';
import theme from '../theme/theme';
import ControlPanel from './ControlPanel';

function MainPage() {
    // Example tags and cases data
    const tags = ["React", "JavaScript", "Node.js"];
    const cases = [
        { id: 1, tags: ["HTML", "CSS"], content: "Example content for case 1..." },
        { id: 2, tags: ["React", "Hooks"], content: "Example content for case 2..." },
        { id: 3, tags: ["Node.js", "Express"], content: "Example content for case 3...Example content for case 3...Example content for case 3...Example content for case 3...Example content for case 3...Example content for case 3...Example content for case 3..." },
        { id: 4, tags: ["Node.js", "Express"], content: "Example content for case 3...Example content for case 3...Example content for case 3...Example content for case 3...Example content for case 3...Example content for case 3...Example content for case 3..." },
        { id: 5, tags: ["Node.js", "Express"], content: "Example content for case 3...Example content for case 3...Example content for case 3...Example content for case 3...Example content for case 3...Example content for case 3...Example content for case 3..." },
        { id: 6, tags: ["Node.js", "Express"], content: "Example content for case 3...Example content for case 3...Example content for case 3...Example content for case 3...Example content for case 3...Example content for case 3...Example content for case 3..." },
        { id: 7, tags: ["Node.js", "Express"], content: "Example content for case 3...Example content for case 3...Example content for case 3...Example content for case 3...Example content for case 3...Example content for case 3...Example content for case 3..." },
        { id: 8, tags: ["Node.js", "Express"], content: "Example content for case 3...Example content for case 3...Example content for case 3...Example content for case 3...Example content for case 3...Example content for case 3...Example content for case 3..." },
        { id: 9, tags: ["Node.js", "Express"], content: "Example content for case 3...Example content for case 3...Example content for case 3...Example content for case 3...Example content for case 3...Example content for case 3...Example content for case 3..." },
        { id: 10, tags: ["Node.js", "Express"], content: "Example content for case 3...Example content for case 3...Example content for case 3...Example content for case 3...Example content for case 3...Example content for case 3...Example content for case 3..." },
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
            width: '98vw', // Limits the maximum width
            height: '100vh',
            margin: 'auto', // Centers the box in the available horizontal space
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center', // Ensures that children align in the center when smaller than the box's width
            
            
        }} style={{ overflowY: 'scroll'}}>
            {/* <Paper sx={{ padding: 2, marginBottom: 2, width: '100%' }}>
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
            </Paper> */}
            <ControlPanel/>
            <CardsBoard cases={cases} />
        </Box>
    );
}

export default MainPage;
