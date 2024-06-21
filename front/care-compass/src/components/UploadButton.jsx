import React from 'react';
import Button from '@mui/material/Button';

function UploadButton({ onUpload }) {
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            onUpload(file);
        }
    };

    return (
        <Button component="label" variant="contained" color="primary">
            Upload Text Document
            <input type="file" hidden onChange={handleFileChange} />
        </Button>
    );
}

export default UploadButton;
