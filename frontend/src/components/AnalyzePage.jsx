import React, { useState } from 'react';
import axios from 'axios';
import { Box, Typography, Button, CircularProgress, Alert } from '@mui/material';

const AnalyzePage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleAnalyze = async () => {
    if (!selectedFile) {
      setError("파일을 선택해주세요.");
      return;
    }

    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post('http://localhost:8000/api/v1/analyze', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      console.log("분석 결과:", response.data);
    } catch (err) {
      console.error(err);
      setError("분석 요청 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box 
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="80vh"
      bgcolor="#f4f6f8"
      p={3}
    >
      <Box 
        bgcolor="white" 
        p={5} 
        borderRadius="12px" 
        boxShadow={3} 
        width="400px"
      >
        <Typography variant="h5" fontWeight="bold" mb={3} textAlign="center">
          이력서 PDF 분석
        </Typography>

        <input type="file" onChange={handleFileChange} style={{ marginBottom: '20px' }} />

        <Button 
          variant="contained" 
          fullWidth 
          onClick={handleAnalyze} 
          disabled={loading}
          sx={{ mt: 2 }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : '분석 요청'}
        </Button>

        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
      </Box>
    </Box>
  );
};

export default AnalyzePage;
