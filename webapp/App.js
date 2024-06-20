import React, { useState } from 'react';
import axios from 'axios';








function App() {
  const [file, setFile] = useState(null);
  const [fileContent, setFileContent] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  

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
    <div className="App">
      <h1>Upload a Text File</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" accept=".txt" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      <h2>File Content</h2>
      <pre>{fileContent}</pre>
    </div>
  );
}

export default App;
