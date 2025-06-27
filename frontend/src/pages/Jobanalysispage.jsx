// 📄 src/pages/Analysis.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import "./Jobanalysispage.css";

function Analysis() {
  const navigate = useNavigate();
  const [selectedJob, setSelectedJob] = useState('backend');
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const storedUserInfo = localStorage.getItem("userInfo");
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    } else {
      alert("로그인이 필요합니다.");
      navigate("/login");
    }
  }, []);

  const selectJob = (job) => {
    setSelectedJob(job);
    setSelectedSkills([]);
  };

  const toggleSkill = (skill) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const generateGptRoadmap = async () => {
    if (!userInfo) {
      alert("로그인이 필요합니다.");
      navigate("/login");
      return;
    }

    if (selectedSkills.length === 0) {
      alert("기술을 하나 이상 선택해주세요!");
      return;
    }

    try {
      const res = await fetch("http://localhost:8000/api/v1/roadmap", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          job: selectedJob,
          skills: selectedSkills
        })
      });

      if (!res.ok) {
        throw new Error("서버 응답 오류");
      }

      const result = await res.json();
      console.log("📊 분석 결과:", result);
      navigate("/roadmap-result", { state: result });
    } catch (error) {
      console.error("❌ 분석 실패:", error);
      alert("분석 중 오류가 발생했습니다.");
    }
  };

  return (
    <div>
      <div className="tab-bar">
        <button className="tab" onClick={() => navigate("/resume")}>PDF분석</button>
        <button className="tab active">직무분석</button>
        <button className="analyze-btn" onClick={generateGptRoadmap}>분석시작</button>
      </div>

      <section className="section">
        <h3>개발 직군</h3>
        <div className="button-group" id="job-buttons">
          <button onClick={() => selectJob("Backend")} className={selectedJob === "Backend" ? "selected" : ""}>백엔드</button>
          <button onClick={() => selectJob("Frontend")} className={selectedJob === "Frontend" ? "selected" : ""}>프론트엔드</button>
          <button onClick={() => selectJob("Mobile")} className={selectedJob === "Mobile" ? "selected" : ""}>모바일</button>
          <button onClick={() => selectJob("AL/ML")} className={selectedJob === "AL/ML" ? "selected" : ""}>AI/ML</button>
          <button onClick={() => selectJob("etc")} className={selectedJob === "etc" ? "selected" : ""}>기타(DB / 클라우드)</button>
        </div>
      </section>

      {renderCategory("Backend", [
        ["Python", "Java", "Node.js", "Ruby", "Go", "Rust", "Kotlin", "TypeScript"],
        ["Django", "Spring Boot", "Express.js", "Laravel", "NestJS", "Flask", "FastAPI", "Gin", "Ruby on Rails"]
      ], selectedJob, selectedSkills, toggleSkill)}

      {renderCategory("Frontend", [
        ["HTML", "CSS", "JavaScript", "TypeScript"],
        ["React", "Vue.js", "Angular", "Next.js", "Svelte", "Nust.js"]
      ], selectedJob, selectedSkills, toggleSkill)}

      {renderCategory("Mobile", [
        ["Kotlin", "JavaScript", "Swift", "Dart"],
        ["Flutter", "React Native"]
      ], selectedJob, selectedSkills, toggleSkill)}

      {renderCategory("AL/ML", [
        ["Python", "R", "SQL"],
        ["TensorFlow", "PyTorch", "HuggingFace", "Scikit-learn", "Transformers", "LangChain"]
      ], selectedJob, selectedSkills, toggleSkill)}

      {renderCategory("etc", [
        ["MySQL", "PostgreSQL", "MongoDB", "Redis", "SQLite", "Oracle"],
        ["AWS", "GCP", "Azure", "Docker", "Kubernetes", "Terraform", "Jenkins", "GitHub Actions", "Heroku", "Vercel"]
      ], selectedJob, selectedSkills, toggleSkill)}
    </div>
  );
}

function renderCategory(type, [langs, tools], selectedJob, selectedSkills, toggleSkill) {
  if (type !== selectedJob) return null;

  return (
    <section className={`section category ${type}`} key={type}>
      <h3>{type === "etc" ? "DB" : `언어 (${type})`}</h3>
      <div className="button-group">
        {langs.map((lang) => (
          <button
            key={lang}
            onClick={() => toggleSkill(lang)}
            className={selectedSkills.includes(lang) ? "selected" : ""}
          >
            {lang}
          </button>
        ))}
      </div>
      <h3>{type === "etc" ? "클라우드" : `프레임워크/도구 (${type})`}</h3>
      <div className="button-group">
        {tools.map((tool) => (
          <button
            key={tool}
            onClick={() => toggleSkill(tool)}
            className={selectedSkills.includes(tool) ? "selected" : ""}
          >
            {tool}
          </button>
        ))}
      </div>
    </section>
  );
}

export default Analysis;
