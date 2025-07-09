import React from 'react';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';

export default function CookiePolicy() {
  return (
    <Box sx={{ color: 'text.primary' }}>
      <Typography variant="body1" paragraph>
        본 쿠키 정책은 Job Navigator(이하 "서비스")에서 사용자의 웹사이트 이용 경험을 향상시키기 위해 쿠키를
        어떻게 사용하는지에 대한 내용을 설명합니다.
      </Typography>

      <Typography variant="h6" gutterBottom>1. 쿠키란 무엇인가요?</Typography>
      <Typography variant="body1" paragraph>
        쿠키(Cookie)는 사용자가 웹사이트에 방문할 때 브라우저를 통해 컴퓨터 또는 모바일 장치에 저장되는
        작은 텍스트 파일입니다. 쿠키는 사용자 설정 정보를 저장하거나 방문 기록을 추적하는 데 사용됩니다.
      </Typography>

      <Typography variant="h6" gutterBottom>2. 어떤 쿠키를 사용하나요?</Typography>
      <List dense>
        <ListItem>
          <ListItemText
            primary="필수 쿠키"
            secondary="서비스 운영과 보안을 위해 반드시 필요한 쿠키로, 로그인 세션 유지 등에 사용됩니다."
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="성능 및 분석 쿠키"
            secondary="사용자 활동을 분석하여 UI 개선 및 오류 모니터링 등에 사용됩니다."
          />
        </ListItem>
      </List>

      <Typography variant="h6" gutterBottom>3. 쿠키 사용 목적</Typography>
      <List dense>
        <ListItem><ListItemText primary="로그인 상태 유지 및 사용자 인증" /></ListItem>
        <ListItem><ListItemText primary="이용자 경험 분석을 통한 서비스 개선" /></ListItem>
        <ListItem><ListItemText primary="보안 기능 및 세션 보호" /></ListItem>
      </List>

      <Typography variant="h6" gutterBottom>4. 쿠키 거부 및 삭제 방법</Typography>
      <Typography variant="body1" paragraph>
        사용자는 브라우저 설정을 통해 쿠키 저장을 거부하거나, 저장된 쿠키를 삭제할 수 있습니다. 다만,
        필수 쿠키를 차단할 경우 서비스 이용에 제한이 있을 수 있습니다.
      </Typography>

      <Typography variant="h6" gutterBottom>5. 정책의 변경</Typography>
      <Typography variant="body1" paragraph>
        본 쿠키 정책은 2025년 7월 9일부터 적용되며, 관련 내용은 추후 변경될 수 있습니다. 변경 사항은 서비스
        내 고지를 통해 안내드립니다.
      </Typography>
    </Box>
  );
}
