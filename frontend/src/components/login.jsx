import React from "react";
import "./Login.css";

 const login = () => {
    // 일반 로그인 처리 로직
  };

  const naverLogin = () => {
    window.location.href = 'http://localhost:8081/oauth2/authorization/naver';
  };

  const googleLogin = () => {
    window.location.href = 'http://localhost:8081/oauth2/authorization/google';
  };

  const kakaoLogin = () => {
    window.location.href = 'http://localhost:8081/oauth2/authorization/kakao';
  };


export default function SignupSocial() {
  return (
    <div className="container">
      <div className="title">로그인</div>
      <div className="description">소셜 로그인 및 이메일로 가입할 수 있습니다.</div>

      <button className="social-button google" onClick={googleLogin}>
        <img src="/google.png" alt="Google" />
        Google로 시작하기
      </button>

      <button className="social-button kakao"  onClick={kakaoLogin}>
        <img src="/kakao.png" alt="Kakao" />
        카카오로 시작하기
      </button>

      <button className="social-button naver" onClick={naverLogin}>
        <img src="/naver.png" alt="Naver" />
        네이버로 시작하기
      </button>
    </div>
  );
}
