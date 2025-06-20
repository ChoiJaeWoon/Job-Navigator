import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SocialLoginButton.css";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const NAVER_CLIENT_ID = import.meta.env.VITE_NAVER_CLIENT_ID;
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function SocialLoginButton({ setUserInfo }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (window.google && GOOGLE_CLIENT_ID) {
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleGoogleLogin,
      });
      window.google.accounts.id.renderButton(
        document.getElementById("google-login-btn"),
        { theme: "outline", size: "large", width: "250" }
      );
    }

    if (window.naver && NAVER_CLIENT_ID) {
      const naverLogin = new window.naver.LoginWithNaverId({
        clientId: NAVER_CLIENT_ID,
        callbackUrl: `${window.location.origin}/login`,
        isPopup: false,
        loginButton: { color: "green", type: 3, height: "50" },
      });
      naverLogin.init();
    }

    const hashParams = new URLSearchParams(window.location.hash.slice(1));
    const naverAccessToken = hashParams.get("access_token");

    if (naverAccessToken) {
      fetch(`${API_BASE_URL}/api/v1/auth/naver-login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ access_token: naverAccessToken }),
      })
        .then((res) => res.json())
        .then((user) => {
          localStorage.setItem("access_token", user.access_token);
          localStorage.setItem("userInfo", JSON.stringify(user));
          setUserInfo(user);
          navigate("/");
        })
        .catch((err) => {
          console.error("❌ 네이버 로그인 실패:", err);
          navigate("/");
        });
      return;
    }

    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get("token");

    if (token) {
      localStorage.setItem("access_token", token);
      fetch(`${API_BASE_URL}/api/v1/auth/verify-token`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((user) => {
          localStorage.setItem("userInfo", JSON.stringify(user));
          setUserInfo(user);
          navigate("/");
        })
        .catch((err) => {
          console.error("❌ 유저 정보 조회 실패:", err);
          navigate("/");
        });
    }
  }, []);

  const handleGoogleLogin = async (response) => {
    const id_token = response.credential;
    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/auth/google-login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id_token_str: id_token }),
      });
      const data = await res.json();
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("userInfo", JSON.stringify(data));
      setUserInfo(data);
      navigate("/");
    } catch (err) {
      console.error("❌ 구글 로그인 실패:", err);
    }
  };

  const handleKakaoLogin = () => {
    window.location.href = `${API_BASE_URL}/api/v1/auth/kakao-login`;
  };

  return (
    <div className="social-login-wrapper">
      {/* ✅ 구글: renderButton으로 직접 렌더링 */}
      <div className="social-button google" style={{ padding: 0, border: "none" }}>
        <div id="google-login-btn" style={{ width: "100%" }} />
      </div>

      {/* ✅ 네이버: 이미지 버튼으로 클릭 유도 */}
      <button
        className="social-button naver"
        onClick={() =>
          document.getElementById("naverIdLogin")?.children[0]?.click()
        }
      >
        <img src="/naver.png" alt="Naver" />
        naver 계정으로 로그인
      </button>

      {/* ✅ 카카오 */}
      <button className="social-button kakao" onClick={handleKakaoLogin}>
        <img src="/kakao.png" alt="Kakao" />
        kakao 계정으로 로그인
      </button>

      {/* 실제 네이버 버튼 (숨겨짐) */}
      <div style={{ display: "none" }} id="naverIdLogin" />
    </div>
  );
}
