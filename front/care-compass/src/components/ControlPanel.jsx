import React, { useState } from 'react';
import UploadButton from './UploadButton.jsx';
import TagsArea from './TagsArea';
import SearchInput from './SearchInput.jsx';
import Button from '@mui/material/Button';

function ControlPanel() {
    const [uploaded, setUploaded] = useState(false);
    const [fileData, setFileData] = useState(null);

    const handleFileUpload = (file) => {
        // Simulate file upload process
        console.log("Uploading file...");
        setTimeout(() => {
            setFileData(file); // Assume file data is returned after upload
            setUploaded(true);
        }, 1000); // Simulate upload delay
    };

    const [file, setFile] = useState(null);
  const [fileContent, setFileContent] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  //This is the handleSubmit Mathan wrote for the AI
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://127.0.0.1:5000/upload', formData, {
        headers: {
              'Content-Type': 'multipart/form-data',
              'Access-Control-Allow-Origin': '*',
            
        }
      });
      setFileContent(response.data.file_content);
      
    } catch (error) {
      console.error('Error uploading file:', error);
    }
        
  
  };

    return (
        <div>
            {uploaded ? (
                <div>
                    <TagsArea fileData={fileData} />
                    <Button variant="contained" color="primary">Submit</Button>
                </div>
            ) : (
                <UploadButton onUpload={handleFileUpload} />
            )}
            {!uploaded && (
                <SearchInput />
            )}
        </div>
    );
}

export default ControlPanel;
