import React, { useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import PrivacyPolicy from '../components/policies/PrivacyPolicy';
import TermsOfService from '../components/policies/TermsOfService';
import CookiePolicy from '../components/policies/CookiePolicy';

export default function PolicyPage() {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <Box sx={{ maxWidth: '800px', mx: 'auto', p: 3 }}>
      {/* ✅ 상단 탭 메뉴 */}
      <Tabs
        value={tabIndex}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
        sx={{ mb: 3 }}
      >
        <Tab label="개인정보처리방침" />
        <Tab label="이용약관" />
        <Tab label="쿠키정책" />
      </Tabs>

      {/* ✅ 탭별 내용 렌더링 */}
      <Box hidden={tabIndex !== 0}>
        <PrivacyPolicy />
      </Box>
      <Box hidden={tabIndex !== 1}>
        <TermsOfService />
      </Box>
      <Box hidden={tabIndex !== 2}>
        <CookiePolicy />
      </Box>
    </Box>
  );
}
