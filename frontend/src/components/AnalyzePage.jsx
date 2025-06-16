import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { Box, Typography, Button, CircularProgress, Alert } from '@mui/material';

const AnalyzePage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  const validateFile = (file) => {
    if (!file) return false;
    const isPdf = file.type === 'application/pdf';
    return isPdf;
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (validateFile(file)) {
      setSelectedFile(file);
      setError("");
    } else {
      setSelectedFile(null);
      setError("PDF 파일만 업로드 가능합니다.");
    }
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (validateFile(file)) {
      setSelectedFile(file);
      setError("");
    } else {
      setSelectedFile(null);
      setError("PDF 파일만 업로드 가능합니다.");
    }
  }, []);

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDragEnter = () => {
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
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
        border={isDragging ? '2px dashed #4caf50' : '2px dashed #aaa'}
        bgcolor={isDragging ? '#e8f5e9' : 'white'}
        textAlign="center"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
      >
        <Typography variant="h5" fontWeight="bold" mb={3}>
          이력서 PDF 분석
        </Typography>

        <Typography variant="body2" mb={2} color="gray">
          PDF 파일을 여기에 드래그하거나 클릭해서 업로드하세요.
        </Typography>

        {isDragging && (
          <Typography variant="body2" mb={2} color="#4caf50" fontWeight="bold">
            파일을 여기로 놓으세요!
          </Typography>
        )}

        <input 
          type="file" 
          accept="application/pdf"
          onChange={handleFileChange} 
          style={{ marginBottom: '20px' }} 
        />

        {selectedFile && (
          <Typography variant="body2" mb={2} color="green">
            선택된 파일: {selectedFile.name}
          </Typography>
        )}

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
