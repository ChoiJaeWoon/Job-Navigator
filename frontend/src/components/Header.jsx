import { Link, useNavigate } from 'react-router-dom';
import { Button, Avatar, IconButton, Menu, MenuItem } from '@mui/material';
import { useState, useEffect } from 'react';
import './Header.css';
import LoginModal from '../components/LoginModal';

export default function Header({ userInfo, setUserInfo }) {
  const navigate = useNavigate();

  // ⭐️ 아바타 메뉴 열림 상태
  const [anchorEl, setAnchorEl] = useState(null);
  // ⭐️ 로그인 모달 열림 상태
  const [loginOpen, setLoginOpen] = useState(false);
  // ⭐️ 로그인 후 리다이렉트할 경로 저장
  const [redirectPath, setRedirectPath] = useState(null);

  // ⭐️ 로그아웃 핸들러
  const handleLogout = () => {
    // 로컬스토리지에 저장된 모든 사용자 정보 삭제
    [
      'userInfo',
      'token',
      'access_token',
      'userId',
      'userNick',
      'signupData',
      'kakao_state',
      'com.naverid.oauth.state_token',
    ].forEach((key) => localStorage.removeItem(key));

    // 상태 초기화 및 홈으로 이동
    setUserInfo(null);
    navigate('/');
  };

  // ⭐️ 아바타 메뉴 열기
  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);

  // ⭐️ 아바타 메뉴 닫기
  const handleMenuClose = () => setAnchorEl(null);

  // ⭐️ 컴포넌트 마운트 시 localStorage에서 사용자 정보 복구
  useEffect(() => {
    const storedUser = localStorage.getItem('userInfo');
    if (storedUser) {
      setUserInfo(JSON.parse(storedUser));
    }
  }, []);

  // ⭐️ 로그인 성공 후 처리 로직
  useEffect(() => {
    const storedRedirect = localStorage.getItem('redirectPath');

    // redirectPath가 있으면 해당 경로로 이동
    if (userInfo && storedRedirect) {
      navigate(storedRedirect);
      localStorage.removeItem('redirectPath');
      setRedirectPath(null);
    }

    // 로그인 성공 시 로그인 모달 자동 닫기
    if (userInfo) {
      setLoginOpen(false);
    }
  }, [userInfo]);

  // ⭐️ 이력서 분석 버튼 클릭 시 처리
  const handleResumeClick = () => {
    if (userInfo) {
      // 로그인되어 있으면 바로 이력서 분석 페이지로 이동
      navigate('/resume');
    } else {
      // 로그인 안되어 있으면 redirectPath를 설정 후 모달 열기
      localStorage.setItem('redirectPath', '/resume');
      setRedirectPath('/resume');
      setLoginOpen(true);
    }
  };

  return (
    <>
      <header className="header">
        <div className="header-top">
          {/* ⭐️ 로고 클릭 시 홈으로 이동 */}
          <Link to="/">
            <img src="logo.png" alt="로고" className="logo" />
          </Link>

          {/* ⭐️ 로그인/아바타 영역 */}
          <div className="auth-links">
            {userInfo ? (
              <>
                {/* 로그인된 경우: 아바타 표시 및 메뉴 */}
                <IconButton onClick={handleMenuOpen}>
                  <Avatar
                    src={
                      userInfo?.profile_image?.startsWith('http')
                        ? userInfo.profile_image
                        : `${import.meta.env.VITE_API_BASE_URL}${userInfo.profile_image}?t=${new Date().getTime()}`
                    }
                    sx={{
                      width: 36,
                      height: 36,
                      border: '1.5px solid #e0e0e0',
                      '&:hover': { borderColor: 'rgb(194, 194, 194)' },
                    }}
                  />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  {/* 마이페이지 이동 메뉴 */}
                  <MenuItem
                    onClick={() => {
                      handleMenuClose();
                      navigate('/mypage');
                    }}
                  >
                    마이페이지
                  </MenuItem>
                  {/* 로그아웃 메뉴 */}
                  <MenuItem
                    onClick={() => {
                      handleMenuClose();
                      handleLogout();
                    }}
                  >
                    로그아웃
                  </MenuItem>
                </Menu>
              </>
            ) : (
              // 로그인되지 않은 경우: 로그인 버튼
              <Button
                onClick={() => {
                  // 상단 로그인 버튼 클릭 시 redirectPath 제거
                  localStorage.removeItem('redirectPath');
                  setRedirectPath(null);
                  setLoginOpen(true);
                }}
              >
                로그인
              </Button>
            )}
          </div>
        </div>

        {/* ⭐️ 상단 메뉴 버튼 영역 */}
        <div className="header-menu">
          {[
            { label: '트렌드 분석', link: '/trend' },
            { label: '채용 공고', link: '/jobs' },
          ].map(({ label, link }) => (
            <Button
              key={label}
              onClick={() => navigate(link)}
              variant="text"
              sx={{
                fontSize: 15,
                fontWeight: 600,
                color: '#333',
                '&:hover': { color: '#1976d2' },
              }}
            >
              {label}
            </Button>
          ))}

          {/* 이력서 분석 버튼 */}
          <Button
            key="이력서 분석"
            onClick={handleResumeClick}
            variant="text"
            sx={{
              fontSize: 15,
              fontWeight: 600,
              color: '#333',
              '&:hover': { color: '#1976d2' },
            }}
          >
            이력서 분석
          </Button>
        </div>
      </header>

      {/* ⭐️ 로그인 모달 컴포넌트 */}
      <LoginModal
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
        setUserInfo={setUserInfo}
      />
    </>
  );
}
