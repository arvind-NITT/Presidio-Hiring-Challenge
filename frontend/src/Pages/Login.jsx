import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useHistory to navigate after successful login
import '../styles/login.css'; // CSS file for form styling

const Login = () => {
  //const history = useHistory();

  // State variables to hold form data
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send POST request to backend API
      const response = await axios.post('/api/v1/auth/login', formData);

      // Handle success
      if(response.status === 200){
        localStorage.setItem('token', response.data.token);
        alert("login succesfull");
        navigate('/');
      }
      else{
        alert("login failed");
      }

      // Save token to local storage
      

      // Redirect to home page or any other route
     
    } catch (error) {
      // Handle error
      console.error('Login failed:', error.response.data);
      // Display error message to the user
    }
  };

  return (
    <div className="login-form-container">
      <h2>Login Form</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
