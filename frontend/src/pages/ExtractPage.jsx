// 사용자가 PDF를 업로드하고, 기술스택 추출 결과를 확인하는 전체 페이지

import React, { useState } from 'react';
import FileUploader from '../components/FileUploader'; 

function ExtractPage() {
    // 추출된 기술스택 결과를 저장하는 상태값
    const [extractedStack, setExtractedStack] = useState([]);

    // FileUploader 컴포넌트에서 추출 결과를 받아올 콜백 함수
    const handleExtracted = (result) => {
        setExtractedStack(result); // 추출된 기술스택 리스트를 저장
    };

    return (
        <div style={{ padding: '40px', fontFamily: 'Arial' }}>
        <h1>기술스택 추출 시스템</h1>

        {/* 파일 업로더 컴포넌트 */}
        <FileUploader onExtracted={handleExtracted} />

        <hr style={{ margin: '40px 0' }} />

        <h2>추출된 기술스택 결과</h2>

        {/* 추출 결과 출력 */}
        {extractedStack.length === 0 ? (
            <p>아직 추출 결과가 없습니다.</p>
        ) : (
            <ul>
            {extractedStack.map((tech, idx) => (
                <li key={idx} style={{ fontSize: '18px' }}>{tech}</li>
            ))}
            </ul>
        )}
        </div>
    );
}

export default ExtractPage;