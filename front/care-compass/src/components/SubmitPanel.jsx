import React, { useState } from 'react';
import TagsArea from './TagsArea';  // Import the TagsArea component
import Button from '@mui/material/Button';

function SubmitPanel() {
    // Initialize with hardcoded tags
    const [tags, setTags] = useState(["React", "JavaScript", "Node.js"]);

    // Handle the submit action
    const handleSubmit = () => {
        console.log("Submitting tags:", tags);
        // Add any actions to perform with the tags here
        // This could be an API call or any other logic
    };

    return (
        <div>
            <TagsArea tags={tags} />  // Pass tags to the TagsArea component
            <Button variant="contained" color="primary" onClick={handleSubmit}>
                Submit
            </Button>
        </div>
    );
}

export default SubmitPanel;
