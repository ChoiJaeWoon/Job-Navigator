// 이 컴포넌트는 PDF 파일 업로드 및 기술스택 추출 API 호출을 담당
// 프론트엔드에서 백엔드 FastAPI 서버와 직접 통신

import React, { useState } from 'react';
import axios from 'axios'; // HTTP 통신을 위해 

function FileUploader({ onExtracted }) {
    // 업로드할 파일 상태를 관리
    const [file, setFile] = useState(null);

    // 업로드 진행 중인지 여부 (로딩 표시용)
    const [isUploading, setIsUploading] = useState(false);

    // 파일 선택 시 호출되는 함수 (파일 선택 이벤트 헨들러)
    const handleFileChange = (e) => {
        setFile(e.target.files[0]); // 첫 번째 선택된 파일을 state에 저장
    };

    // 파일 업로드 및 추출 API 호출
    const handleSubmit = async () => {
        if (!file){
            alert("먼저 파일을 선택해주세요.")
            return;
        }

        // axios를 사용하여 파일 전송
        const formData = new FormData();
        formData.append("file", file);

        try {
            setIsUploading(true); // 업로드 시작시 로딩 상태 true

            // 백엔드 FastAPI 서버의 API 엔드포인트로 POST 요청
            const response = await axios.post(
                "http://localhost:8000/api/v1/extract/techstack",
                formData,
                { headers: { "Content-Type" : "multipart/form-data" } }
            );

            // 추출 결과를 부모 컴포넌트로 전달
            onExtracted(response.data.tech_stack);

        } catch (error) {
            console.error("업로드 중 에러 발생: ", error);
            alert("파일 업로드 또는 추출 중 오류가 발생했습니다.");
        } finally {
            setIsUploading(false); // 업로드 종료시 로딩 상태 false
        }
    };

    return (
    <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '10px' }}>
      <h2>이력서 PDF 업로드</h2>
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      <br /><br />
      <button onClick={handleSubmit} disabled={isUploading}>
        {isUploading ? "업로드 중..." : "추출 시작"}
      </button>
    </div>
  );
}

export default FileUploader;