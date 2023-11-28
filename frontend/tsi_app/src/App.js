// import logo from './logo.svg';
import Player from './pages/Player/Player';
import SignupPage from './pages/Signup';
import LoginPage from './pages/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import './App.css';
function App() {

  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Player />} />
          <Route path="/register" element={<SignupPage />} />
          <Route path="/signup" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
