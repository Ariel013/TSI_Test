// import logo from './logo.svg';
import Player from './pages/Player/Player';
import SignupPage from './pages/Signup';
import LoginPage from './pages/Login';
import Users from './components/Users';
// import Dashboard from './pages/Dashboard';
import {
  UserCircle,
  LayoutDashboard,
  Boxes,
} from "lucide-react"
import Sidebar from './components/Sidebar';
import { SidebarItem } from './components/Sidebar';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import './App.css';
function App() {

  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Player />} />
          <Route path="/register" element={<SignupPage />} />
          <Route path="/signup" element={<LoginPage />} />
          <Route path="/users" element={<Users />} />
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
      </Routes>
      <Sidebar>
            <SidebarItem icon={<LayoutDashboard size={20} />} text="Dashboard" alert />
            <SidebarItem icon={<UserCircle size={20} />} text="Users" />
            <SidebarItem icon={<UserCircle size={20} />} text="Players" />
            <SidebarItem icon={<Boxes size={20} />} text="Games" />
        </Sidebar>
    </BrowserRouter>
  );
}

export default App;
