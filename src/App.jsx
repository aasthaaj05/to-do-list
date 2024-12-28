import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './components/SignUp';
import Login from './components/SignIn';
import Dashboard from './components/Dashboard';
import './App.css';
import HomePage from './components/HomePage'; 

function App() {
  return (
    <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
    </Router>
  );
}

export default App;

