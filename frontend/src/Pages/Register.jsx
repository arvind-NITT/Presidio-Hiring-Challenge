import React, { useState } from 'react';
import axios from 'axios';
import '../styles/register.css'; // CSS file for form styling
import { useNavigate } from 'react-router-dom';
const Register = () => {
  // State variables to hold form data
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    password: '',
    role: 'buyer', // Default role
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
      const response = await axios.post('/api/v1/auth/register', formData);

      // Handle success
      if(response.status === 200){
        alert("registration succesfull");
        navigate('/login');

      }
      else{
        alert("some erro while register");
      }
      // You can redirect or show a success message here
    } catch (error) {
      // Handle error
      console.error('Registration failed:', error.response.data);
      // Display error message to the user
    }
  };

  return (
    <div className="registration-form-container">
      <h2>Registration Form</h2>
      <form className="registration-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstname">First Name</label>
          <input type="text" id="firstname" name="firstname" value={formData.firstname} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="lastname">Last Name</label>
          <input type="text" id="lastname" name="lastname" value={formData.lastname} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input type="text" id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="role">Role</label>
          <select id="role" name="role" value={formData.role} onChange={handleChange}>
            <option value="buyer">Buyer</option>
            <option value="seller">Seller</option>
          </select>
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
