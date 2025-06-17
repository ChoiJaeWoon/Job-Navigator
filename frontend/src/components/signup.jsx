// src/components/Signup.jsx
import React, { useState } from "react";
import "./signup.css";

export default function Signup() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [birth, setBirth] = useState("");
  const [error, setError] = useState("");

  const register = () => {
    if (!id || !password || !confirmPassword || !username || !email || !birth) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    if (password !== confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (isNaN(birth) || birth.length !== 8) {
      alert("생년월일은 8자리 숫자로 입력해주세요.");
      return;
    }

    localStorage.setItem("userId", id);
    localStorage.setItem("userPassword", password);

    setError("");
    alert("회원가입이 완료되었습니다!");
  };

  return (
    <div className="signup-wrapper">
      <div className="signup-box">
        <h2>회원가입</h2>
        <input type="text" placeholder="ID" value={id} onChange={(e) => setId(e.target.value)} />
        <input type="password" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} />
        <input type="password" placeholder="비밀번호 확인" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        <input type="text" placeholder="사용자 이름" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="email" placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="text" placeholder="생년월일 (8자리)" value={birth} onChange={(e) => setBirth(e.target.value)} />
        {error && <p className="signup-error">{error}</p>}
        <button className="signup-button" onClick={register}>회원가입</button>
        <p className="signup-login-link">
          이미 계정이 있으신가요? <a href="/login">로그인</a>
        </p>
      </div>
    </div>
  );
}
