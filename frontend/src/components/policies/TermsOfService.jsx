import React from 'react';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';

export default function TermsOfService() {
  return (
    <Box sx={{ color: 'text.primary' }}>
      <Typography variant="body1" paragraph>
        본 약관은 Job Navigator(이하 "서비스")가 제공하는 이력서 분석 및 커리어 추천 기능의 이용에 관한
        조건 및 절차, 회원과 서비스 간의 권리·의무 및 책임사항 등을 규정함을 목적으로 합니다.
      </Typography>

      <Typography variant="h6" gutterBottom>1. 서비스의 정의 및 목적</Typography>
      <Typography variant="body1" paragraph>
        본 서비스는 사용자가 업로드한 이력서를 기반으로 AI 분석을 수행하여 커리어 인사이트, 기술 트렌드,
        직무 적합도 등의 정보를 제공하는 온라인 플랫폼입니다.
      </Typography>

      <Typography variant="h6" gutterBottom>2. 회원가입 및 계정관리</Typography>
      <List dense>
        <ListItem><ListItemText primary="회원은 소셜 로그인(Google, Naver, Kakao)을 통해 서비스에 가입할 수 있습니다." /></ListItem>
        <ListItem><ListItemText primary="가입 시 제공되는 정보는 개인정보처리방침에 따라 안전하게 관리됩니다." /></ListItem>
        <ListItem><ListItemText primary="회원은 자신의 계정 정보를 정확히 유지할 책임이 있습니다." /></ListItem>
      </List>

      <Typography variant="h6" gutterBottom>3. 서비스 이용</Typography>
      <List dense>
        <ListItem><ListItemText primary="회원은 자신의 이력서를 업로드하여 분석 기능을 이용할 수 있습니다." /></ListItem>
        <ListItem><ListItemText primary="분석 결과는 참고용 정보이며, 채용 여부를 보장하지 않습니다." /></ListItem>
        <ListItem><ListItemText primary="서비스는 사전 고지 없이 기능을 변경하거나 일시 중단할 수 있습니다." /></ListItem>
      </List>

      <Typography variant="h6" gutterBottom>4. 이용자의 책임과 의무</Typography>
      <List dense>
        <ListItem><ListItemText primary="타인의 정보를 도용하거나 허위 정보를 제공해서는 안 됩니다." /></ListItem>
        <ListItem><ListItemText primary="서비스의 정상적인 운영을 방해하는 행위를 금합니다." /></ListItem>
        <ListItem><ListItemText primary="분석 결과를 무단으로 복제, 배포하는 행위를 금합니다." /></ListItem>
      </List>

      <Typography variant="h6" gutterBottom>5. 지적재산권</Typography>
      <Typography variant="body1" paragraph>
        서비스에서 제공하는 모든 콘텐츠(분석 결과, UI, 알고리즘 등)의 지적재산권은 회사 또는 정당한
        권리자에게 있으며, 무단 복제 및 사용을 금합니다.
      </Typography>

      <Typography variant="h6" gutterBottom>6. 면책조항</Typography>
      <Typography variant="body1" paragraph>
        본 서비스는 AI 기반 분석 결과를 제공하나, 이는 정보 제공의 목적이며 사용자의 취업 성공, 경력 발전을
        보장하지 않습니다. 사용자의 판단과 책임하에 활용되어야 합니다.
      </Typography>

      <Typography variant="h6" gutterBottom>7. 약관의 변경 및 고지</Typography>
      <Typography variant="body1" paragraph>
        본 약관은 2025년 7월 9일부터 적용되며, 서비스 운영상 필요에 따라 사전 고지 후 변경될 수 있습니다.
      </Typography>
    </Box>
  );
}
