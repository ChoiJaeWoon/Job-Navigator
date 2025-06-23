// 📄 파일명: src/App.jsx

import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import Jobs from './pages/JobsPage';
import TrendPage from './pages/TrendPage';
import ResumeAnalysisPage from './pages/ResumeAnalysisPage';
import Header from './components/Header';
import Jobanalysispage from './pages/Jobanalysispage';

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
    <>
      <Header userInfo={userInfo} setUserInfo={setUserInfo} />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage setUserInfo={setUserInfo} />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/trend" element={<TrendPage />} />
        <Route path="/resume" element={<ResumeAnalysisPage />} />
        <Route path="/analysis" element={<Jobanalysispage />} />
      </Routes>
    </>
  );
}

export default App;
