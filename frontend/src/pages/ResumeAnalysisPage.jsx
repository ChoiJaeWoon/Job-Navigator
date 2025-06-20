import React from 'react';
import Header from '../components/Header';
import "./ResumeAnalysisPage.css";
import { useNavigate } from 'react-router-dom';

export default function ResumeAnalysisPage() {
  const navigate = useNavigate();

  const goToJobPage = () => {
    navigate("/analysis");
  };

  return (
    <div>
      {/* 탭바 */}
      <div className="tab-bar">
        <button className="tab active2">PDF분석</button>
        <button className="tab2" onClick={goToJobPage}>직무분석</button>
      </div>

      {/* PDF 업로드 영역 */}
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