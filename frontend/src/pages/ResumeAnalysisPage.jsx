import React from 'react';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import "./ResumeAnalysisPage.css";

function ResumeAnalysisPage() {
  const navigate = useNavigate();

  const goToJobPage = () => {
    navigate('/job-analysis'); // 원하는 경로로 수정
  };

  return (
    <div>
      <Header />

      <div className="tab-bar">
        <button className="tab active2">PDF분석</button>
        <button className="tab2" onClick={goToJobPage}>직무분석</button>
      </div>

      <div className="pdf-upload-container">
        <input
          type="file"
          accept="application/pdf"
          className="pdf-input"
          placeholder="PDF파일을 올려주세요"
        />
        <button className="pdf-upload-button">분석시작</button>
      </div>
    </div>
  );
}

export default ResumeAnalysisPage;
