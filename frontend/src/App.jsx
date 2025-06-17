import { Routes, Route } from 'react-router-dom';
import Login from './components/login'; // 경로는 실제 구조에 맞게 조정
import Signup from './components/signup';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}

export default App;
