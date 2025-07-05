import { useState, useEffect } from 'react';
import TechTrendDashboard from '../components/TechTrendDashboard.jsx';
import SummaryBox from '../components/SummaryBox.jsx';
import './TrendPage.css';

import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Stack,
  Button,
} from '@mui/material';

function TrendPage() {
  const [trendData, setTrendData] = useState([]);
  const [summary, setSummary] = useState('');
  const [displayedSummary, setDisplayedSummary] = useState('');
  const [activeTab, setActiveTab] = useState('백엔드');
  const [tabClicked, setTabClicked] = useState(() => localStorage.getItem('trend_tab_visited') === 'true');
  const [animate, setAnimate] = useState(false);
  const [showSummaryBox, setShowSummaryBox] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [visibleCount, setVisibleCount] = useState(5); // 👉 보여줄 개수 관리

  useEffect(() => {
    const fetchTrendData = async () => {
      try {
        const tabToQueryParam = {
          '백엔드': 'backend',
          '프론트엔드': 'frontend',
          '모바일': 'mobile',
          'AI': 'data',
        };
        const roleQuery = tabToQueryParam[activeTab];
        const baseUrl = import.meta.env.VITE_API_BASE_URL;

        const response = await fetch(`${baseUrl}/api/v1/trends/roles/${roleQuery}`);
        if (!response.ok) throw new Error('응답 실패');

        const data = await response.json();
        setTrendData(data.top_5);
        setSummary(data.summary);
        setSelectedSkill(null);
        setFilteredJobs([]);
        setVisibleCount(5);
        setAnimate(false);
        setTimeout(() => setAnimate(true), 100);
        setShowSummaryBox(false);
        setTimeout(() => setShowSummaryBox(true), 5000);
      } catch (error) {
        console.error('📛 기술 트렌드 데이터를 불러오는 중 오류 발생:', error);
        setTrendData([]);
        setSummary('데이터를 불러오지 못했습니다.');
      }
    };

    fetchTrendData();
  }, [activeTab]);

  const handleSkillClick = async (skill) => {
    if (selectedSkill === skill) {
      setSelectedSkill(null);
      setFilteredJobs([]);
      setVisibleCount(5);
      return;
    }

    setSelectedSkill(skill);
    setVisibleCount(5); // 👉 초기화
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    const res = await fetch(`${baseUrl}/api/v1/jobs?tech_stack=${skill}&page=1&size=100`);
    const data = await res.json();
    setFilteredJobs(data.items || []);
  };

  return (
    <div className="container">
      {/* 상단 탭 */}
      <div className="tab-wrapper">
        {!tabClicked && <div className="tab-guide-bubble">탭을 클릭해서 최신 공고를 확인해보세요!</div>}
        <div className="tab-menu top-tab">
          {['백엔드', '프론트엔드', '모바일', 'AI'].map((tab) => (
            <button
              key={tab}
              className={`pill ${activeTab === tab ? 'active' : ''}`}
              onClick={() => {
                setActiveTab(tab);
                setTabClicked(true);
                localStorage.setItem('trend_tab_visited', 'true');
              }}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* 기술 트렌드 */}
      <h2 className="title">{activeTab} 상위 5개 기술 트렌드 (채용공고 기준)</h2>
      <div className="trend-list">
        {trendData.map((tech, idx) => (
          <div key={idx}>
            <div
              className="trend-card"
              onClick={() => handleSkillClick(tech.name)}
              style={{ cursor: 'pointer' }}
            >
              <div className="trend-header">
                <span className="tech-name">{tech.name}</span>
                <span className="tech-percent">{tech.percentage}%</span>
              </div>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{
                    width: animate ? `${tech.percentage}%` : 0,
                    transition: 'width 1.2s ease-in-out',
                    transitionDelay: `${idx * 0.1}s`,
                  }}
                ></div>
              </div>
              <span className="job-count">{tech.count.toLocaleString()}개 공고</span>
            </div>

            {/* 기술 클릭 시 공고 리스트 표시 */}
            {selectedSkill === tech.name && (
              <Box mt={4}>
                <Typography variant="h6" gutterBottom>
                  💼 {tech.name} 관련 채용 공고
                </Typography>
                <Stack spacing={2}>
                  {filteredJobs.slice(0, visibleCount).map((job) => (
                    <Card key={job.id} variant="outlined" sx={{ borderRadius: 3 }}>
                      <CardContent>
                        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                          {job.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          {job.company} · {job.location}
                        </Typography>
                        <Stack direction="row" spacing={1} flexWrap="wrap" mt={1}>
                          {job.tech_stack?.map((tech, idx) => (
                            <Chip
                              key={idx}
                              label={tech}
                              size="small"
                              sx={{ bgcolor: '#f3f4f6' }}
                            />
                          ))}
                        </Stack>
                      </CardContent>
                    </Card>
                  ))}
                </Stack>

                {/* 더보기 / 접기 버튼 */}
                {(filteredJobs.length > visibleCount || visibleCount > 5) && (
                  <Box mt={1} display="flex" justifyContent="space-between">
                    {filteredJobs.length > visibleCount ? (
                      <Button
                        variant="text"
                        onClick={() => setVisibleCount((prev) => prev + 5)}
                        sx={{ textTransform: 'none' }}
                      >
                        더보기 ▼
                      </Button>
                    ) : <span />}

                    {visibleCount > 5 && (
                      <Button
                        variant="text"
                        onClick={() => setVisibleCount(5)}
                        sx={{ textTransform: 'none' }}
                      >
                        접기 ▲
                      </Button>
                    )}
                  </Box>
                )}
              </Box>
            )}
          </div>
        ))}
      </div>

      {/* 기술 요약 */}
      {showSummaryBox ? (
        <SummaryBox
          summary={summary}
          displayedSummary={displayedSummary}
          setDisplayedSummary={setDisplayedSummary}
        />
      ) : (
        <div className="summary-box">
          <p className="summary-title">기술 요약</p>
          <p>✍️ 요약 생성 중입니다...</p>
        </div>
      )}

      {/* 마켓 기반 기술 트렌드 시각화 */}
      <div style={{ marginTop: '60px' }}>
        <h2 className="title">📊 마켓 기반 기술 트렌드 분석</h2>
        <TechTrendDashboard />
      </div>
    </div>
  );
}

export default TrendPage;
