import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Signup from './components/SignUp';
import Login from './components/SignIn';
import Dashboard from './components/Dashboard';
import './App.css';

// function App() {
//   return (
//     <Router>
//       <div className="app-container">
//         <header className="header">
//           <nav className="nav">
//             <Link to="/signup" className="nav-link">Signup</Link>
//             <Link to="/login" className="nav-link">Login</Link>
//             <Link to="/dashboard" className="nav-link">Dashboard</Link>
//           </nav>
//         </header>
//         <main className="main">
//           <Routes>
//             <Route path="/signup" element={<Signup />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/dashboard" element={<Dashboard />} />
//             <Route path="/" element={<Home />} />
//           </Routes>
//         </main>
//         <footer className="footer">
//           © 2024 Your App. All rights reserved.
//         </footer>
//       </div>
//     </Router>
//   );
// }

// function Home() {
//   return (
//     <div className="home">
//       <h1>Welcome to Our App!</h1>
//       <p>Navigate to Signup, Login, or Dashboard using the links above.</p>
//     </div>
//   );
// }

// export default App;
function App() {
  return <div>Hello, World!</div>;
}

export default App;
