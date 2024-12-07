import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase.js';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css' ;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);

      // Check if the user is the admin
      if (email === 'kolyummarket@gmail.com' && password === 'kolyum123') {
        navigate('/Dashboard'); // Redirect to dashboard page
      } else {
        navigate('/'); // Redirect to homepage for other users
      }
    } catch (error) {
      console.error('Login failed:', error);
      alert('Invalid email or password. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin}>
        <h1>Login</h1>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>

      {/* Link to SignUp Page */}
      <p>
        Don't have an account? <Link to="/signup">Sign up here</Link>
      </p>
    </div>
  );
};

export default Login;
