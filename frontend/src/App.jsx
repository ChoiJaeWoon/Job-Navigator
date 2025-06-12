import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

// 기존 Jobs 페이지 (기존 App 로직을 별도 컴포넌트로 이동시키면 깔끔해짐)
import JobsPage from './pages/JobsPage'

// 새로 만든 기술스택 추출 페이지
import ExtractPage from './pages/ExtractPage'

function App() {
  return (
    <Router>
      <div style={{ padding: '20px', fontFamily: 'Arial' }}>
        <h1>Job Navigator</h1>

        {/* 메뉴 네비게이션 */}
        <nav style={{ marginBottom: '20px' }}>
          <Link to="/">Jobs</Link> | 
          <Link to="/extract">기술스택 추출</Link>
        </nav>

        {/* 페이지 라우팅 */}
        <Routes>
          <Route path="/" element={<JobsPage />} />
          <Route path="/extract" element={<ExtractPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
