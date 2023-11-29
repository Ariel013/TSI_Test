// import logo from './logo.svg';
import Player from './pages/Player/Player';
import SignupPage from './pages/Signup';
import LoginPage from './pages/Login';
import Users from './components/Users';
import Players from './components/Players';
import Games from './components/Games';
import Dashboard from './pages/Dashboard';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import './App.css';
function App() {

  return (
    <BrowserRouter>
      <Routes>
          <Route path="/index" element={<Player />} />
          <Route path="/" element={<SignupPage />} />
          <Route path="/signin" element={<LoginPage />} />
          <Route path="/users" element={<Users />} />
          <Route path="/players" element={<Players />} />
          <Route path="/games" element={<Games />} />
          <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
