import React from 'react';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';

export default function PrivacyPolicy() {
  return (
    <Box sx={{ color: 'text.primary' }}>
      <Typography variant="body1" paragraph>
        [Job Navigator]는 「개인정보 보호법」에 따라 이용자의 개인정보를 보호하고, 관련한 고충을 신속하고
        원활하게 처리하기 위해 다음과 같은 처리방침을 수립·공개합니다.
      </Typography>

      <Typography variant="h6" gutterBottom>1. 수집하는 개인정보 항목</Typography>
      <List dense>
        <ListItem><ListItemText primary="이메일 주소, 소셜 로그인 ID(Google, Naver, Kakao 등)" /></ListItem>
        <ListItem><ListItemText primary="업로드된 이력서 파일 (PDF)" /></ListItem>
        <ListItem><ListItemText primary="이력서로부터 추출된 기술 키워드 및 분석 결과" /></ListItem>
        <ListItem><ListItemText primary="서비스 이용 로그(IP, 접속 시간 등)" /></ListItem>
      </List>

      <Typography variant="h6" gutterBottom>2. 개인정보 수집 및 이용 목적</Typography>
      <List dense>
        <ListItem><ListItemText primary="이력서 기반 커리어 분석 및 기술 추천" /></ListItem>
        <ListItem><ListItemText primary="사용자 맞춤형 인사이트 제공" /></ListItem>
        <ListItem><ListItemText primary="서비스 품질 향상 및 통계 분석" /></ListItem>
      </List>

      <Typography variant="h6" gutterBottom>3. 개인정보 보유 및 이용 기간</Typography>
      <List dense>
        <ListItem><ListItemText primary="회원 탈퇴 시 즉시 파기" /></ListItem>
        <ListItem><ListItemText primary="분석 요청 후 생성된 이력/결과는 사용자가 삭제 요청 시 즉시 파기" /></ListItem>
      </List>

      <Typography variant="h6" gutterBottom>4. 제3자 제공 및 위탁</Typography>
      <List dense>
        <ListItem><ListItemText primary="OpenAI GPT API를 통한 이력서 분석 (분석 목적으로만 사용)" /></ListItem>
        <ListItem><ListItemText primary="소셜 로그인 제공업체(OAuth 인증)" /></ListItem>
      </List>

      <Typography variant="h6" gutterBottom>5. 이용자의 권리</Typography>
      <Typography variant="body1" paragraph>
        이용자는 자신의 개인정보에 대해 언제든지 열람, 수정, 삭제를 요청할 수 있습니다. 관련 요청은
        <strong> support@jobnavigator.kr</strong>로 문의해주세요.
      </Typography>

      <Typography variant="h6" gutterBottom>6. 책임자 및 고지</Typography>
      <List dense>
        <ListItem><ListItemText primary="개인정보 보호 책임자: [홍길동]" /></ListItem>
        <ListItem><ListItemText primary="연락처: support@jobnavigator.kr" /></ListItem>
        <ListItem><ListItemText primary="본 방침은 2025년 7월 9일부터 적용됩니다." /></ListItem>
      </List>
    </Box>
  );
}
