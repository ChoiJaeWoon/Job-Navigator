// 📄 Footer.jsx

import React from 'react';
import {
  Container,
  Grid,
  Typography,
  Box,
  Link,
  Stack,
  IconButton,
  Divider,
} from '@mui/material';
import {
  Facebook,
  Twitter,
  Instagram,
  YouTube,
  LocationOn,
  Phone,
  Email,
} from '@mui/icons-material';

export default function Footer() {
  const linkStyle = { color: 'text.primary', fontSize: 14, textDecoration: 'none' };

  return (
    <Box component="footer" bgcolor="#f9f9f9" color="text.primary" py={2} borderTop={1} borderColor="grey.300">
      <Container maxWidth="lg">
        {/* 회사명 */}
        <Box mb={2}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Job Navigator
          </Typography>
          <Typography variant="body2" color="text.secondary" fontSize={14}>
            고객의 성공을 위한 최고의 서비스와 솔루션을 제공하는 것이 저희의 목표입니다.
          </Typography>
          <Stack direction="row" spacing={1} mt={1}>
            <IconButton><Facebook fontSize="small" /></IconButton>
            <IconButton><Twitter fontSize="small" /></IconButton>
            <IconButton><Instagram fontSize="small" /></IconButton>
            <IconButton><YouTube fontSize="small" /></IconButton>
          </Stack>
        </Box>

        {/* 서비스 / 회사 / 연락처 */}
        <Grid container spacing={2} justifyContent="space-between">
          {/* 서비스 */}
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              서비스
            </Typography>
            <Stack spacing={0.5}>
              <Box>
                <Link href="#" sx={linkStyle}> 웹 개발</Link>{' '}
                <Link href="#" sx={linkStyle}>/ 모바일 앱</Link>{' '}
                <Link href="#" sx={linkStyle}>/ 디자인</Link>
              </Box>
              <Box>
                <Link href="#" sx={linkStyle}> 컨설팅</Link>{' '}
                <Link href="#" sx={linkStyle}>/ 유지보수</Link>
              </Box>
            </Stack>
          </Grid>

          {/* 회사 */}
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              회사
            </Typography>
            <Stack spacing={0.5}>
              <Box>
                <Link href="#" sx={linkStyle}> 회사소개</Link>{' '}
                <Link href="#" sx={linkStyle}>/ 채용정보</Link>{' '}
                <Link href="#" sx={linkStyle}>/ 블로그</Link>
              </Box>
              <Box>
                <Link href="#" sx={linkStyle}> 뉴스</Link>{' '}
                <Link href="#" sx={linkStyle}>/ 파트너십</Link>
              </Box>
            </Stack>
          </Grid>

          {/* 연락처 */}
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              연락처
            </Typography>
            <Stack spacing={0.5}>
              <Box display="flex" alignItems="center">
                <LocationOn fontSize="small" sx={{ mr: 1 }} />
                <Typography variant="body2" fontSize={14}>서울특별시 강남구 테헤란로 123</Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <Phone fontSize="small" sx={{ mr: 1 }} />
                <Typography variant="body2" fontSize={14}>02-1234-5678</Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <Email fontSize="small" sx={{ mr: 1 }} />
                <Typography variant="body2" fontSize={14}>contact@company.com</Typography>
              </Box>
            </Stack>
          </Grid>
        </Grid>

        {/* 하단 바 */}
        <Divider sx={{ my: 2 }} />
        <Box
          display="flex"
          flexDirection={{ xs: 'column', md: 'row' }}
          justifyContent="space-between"
          alignItems="center"
          textAlign={{ xs: 'center', md: 'left' }}
        >
          <Typography variant="body2" color="text.secondary" fontSize={13}>
            © 2024 회사명. All rights reserved.
          </Typography>
          <Stack direction="row" spacing={2} mt={{ xs: 1, md: 0 }}>
            <Link href="#" variant="body2" underline="hover" sx={{ color: 'text.primary', fontSize: 13 }}>개인정보처리방침</Link>
            <Link href="#" variant="body2" underline="hover" sx={{ color: 'text.primary', fontSize: 13 }}>이용약관</Link>
            <Link href="#" variant="body2" underline="hover" sx={{ color: 'text.primary', fontSize: 13 }}>쿠키정책</Link>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
