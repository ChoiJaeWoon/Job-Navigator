// 📄 파일명: src/App.jsx

import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import Jobs from './pages/JobsPage';
import TrendPage from './pages/TrendPage';
import ResumeAnalysisPage from './pages/ResumeAnalysisPage';
import Header from './components/Header';
import MyPage from './pages/MyPage';
import Footer from './components/Footer'; // ✅ Footer 컴포넌트 import
import ResumeAnalysisDashboard from './pages/ResumeAnalysisDashboard';
import ResumeAnalysisLoadingDemo from './pages/ResumeAnalysisLoadingDemo';
import SocialLoginRedirectHandler from './pages/SocialLoginRedirectHandler';
import PolicyPage from './pages/PolicyPage';
import './global.css';


function App() {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("userInfo");
    if (storedUser) {
      setUserInfo(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="app-wrapper"> {/* ✅ 반드시 이 div로 감싸야 함 */}
      <Header userInfo={userInfo} setUserInfo={setUserInfo} />

      <main className="main-content"> {/* ✅ 반드시 flex: 1 적용될 영역 */}
        <Routes>
          <Route path="/" element={<MainPage userInfo={userInfo} setUserInfo={setUserInfo} />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/trend" element={<TrendPage />} />
          <Route path="/resume" element={<ResumeAnalysisPage />} />
          <Route path="/resume-analysis/:resumeId" element={<ResumeAnalysisDashboard />} />
          <Route path="/mypage" element={<MyPage userInfo={userInfo} setUserInfo={setUserInfo} />} />
          <Route path="/resume-loading-demo" element={<ResumeAnalysisLoadingDemo />} />
          <Route path="/login" element={<SocialLoginRedirectHandler setUserInfo={setUserInfo} />} />
          <Route path="/policy" element={<PolicyPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
