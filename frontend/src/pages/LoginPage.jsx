// 📄 src/pages/LoginPage.jsx
import React from "react";
import SocialLoginButton from "../components/SocialLoginButton";
import "./LoginPage.css"; // 아래 CSS와 연결

export default function LoginPage({ setUserInfo }) {
  return (
    <div className="login-page-container">
      <div className="login-box">
        <h1 className="login-title">소셜 로그인</h1>
        <SocialLoginButton setUserInfo={setUserInfo} />
      </div>
    </div>
  );
}
