import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Divider, Stack, Button } from '@mui/material';

import logoImg from '../assets/logo.png';
import mainImage from '../assets/main-person-group.png';

function MainPage() {
  return (
    <div className="main-container" style={{ fontFamily: 'sans-serif' }}>
      {/* 헤더 */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.2rem 1rem' }}>
        <Link to="/">
          <img src={logoImg} alt="로고" style={{ width: '120px', height: '45px', cursor: 'pointer' }} />
        </Link>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link to="/login" style={{ textDecoration: 'none', color: '#333', fontWeight: '400', fontSize: '14px' }}>
            로그인
          </Link>
          <Link to="/signup" style={{ textDecoration: 'none', color: '#333', fontWeight: '400', fontSize: '14px' }}>
            회원가입
          </Link>
        </div>
      </header>


      {/* 메뉴 섹션 */}
        <Box>
        <Divider />
        <Stack
            direction="row"
            spacing={4}
            justifyContent="center"
            sx={{ my: 1 }}
        >
            {[
            { label: '트렌드 분석', link: '/trend' },
            { label: '채용 공고', link: '/jobs' },
            { label: '이력서 분석', link: '/analyze' },
            ].map(({ label, link }) => (
            <Button
                key={link}
                component={Link}
                to={link}
                variant="text"
                sx={{
                backgroundColor: 'transparent',
                color: '#333',
                fontWeight: 500,
                '&:hover': {
                    color: '#1976d2',
                },
                }}
            >
                {label}
            </Button>
            ))}
        </Stack>
        <Divider />
        </Box>



    {/* 이미지 섹션*/}
    <section
    style={{
        marginTop:'10px',
        backgroundColor: '#e7ecfb', 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0.1rem 0',
    }}
    >
    <img
        src={mainImage}
        alt="메인 일러스트"
        style={{
        maxWidth: '800px',
        width: '90%',
        height: 'auto',
        padding: '1rem',            
        borderRadius: '10px'     
        }}
    />
    </section>


      {/* 메시지 섹션 */}
      <section style={{ padding: '3rem 1rem', textAlign: 'center' }}>
        <h2>개발자들 요즘머함?</h2>
        <p style={{ marginTop: '0.5rem', color: '#555' }}>
          자신에게 필요한 기술스택을 추천받고 싶으면 계정을 만들거나 로그인하세요.
        </p>

        <Button
        variant="contained"
        sx={{
            mt: 4,
            backgroundColor: '#6c80ff',
            color: '#fff',
            fontWeight: 'bold',
            fontSize: '1rem',
            px: 4,
            py: 1.5,
            borderRadius: '8px',
            '&:hover': {
            backgroundColor: '#5a6fd3',
            },
        }}
        >
        취업 가능한지 알려드림 →
        </Button>

      </section>
    </div>
  );
}

export default MainPage;
