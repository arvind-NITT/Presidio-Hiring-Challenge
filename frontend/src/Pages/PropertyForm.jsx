import React, { useState } from 'react';
import axios from 'axios';
import '../styles/propertyForm.css'; // CSS file for form styling

const PropertyForm = () => {
  // State variables to hold form data
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    numberOfBedrooms: '',
    numberOfBathrooms: '',
    hospitalNearby: '',
    city: '', // Assuming owner ID will be set based on authentication
  });

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
      const token = localStorage.getItem('token');
      console.log(token);
      // Send POST request to backend API with token in headers
      const response = await axios.post('/api/v1/seller/add-property', formData,  {
        headers: {
          'Content-Type': 'application/json',
           Authorization: localStorage.getItem('token'),
        },
      });
      if(response.status == 200){
        alert("property Added successfully");
      }
      else{
        alert("Failed to add property");
      }
     
    } catch (error) {
      // Handle error
      console.error('Failed to add property:', error.response.data);
      // Display error message to the user
    }
  };

  return (
    <div className="property-form-container">
      <h2>Add Property</h2>
      <form className="property-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Property Name</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea id="description" name="description" value={formData.description} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="numberOfBedrooms">Number of Bedrooms</label>
          <input type="number" id="numberOfBedrooms" name="numberOfBedrooms" value={formData.numberOfBedrooms} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="numberOfBathrooms">Number of Bathrooms</label>
          <input type="number" id="numberOfBathrooms" name="numberOfBathrooms" value={formData.numberOfBathrooms} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="hospitalNearby">Hospital Nearby</label>
          <input type="text" id="hospitalNearby" name="hospitalNearby" value={formData.hospitalNearby} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="city">City</label>
          <input type="text" id="city" name="city" value={formData.city} onChange={handleChange} required />
        </div>
        <button type="submit">Add Property</button>
      </form>
    </div>
  );
};

export default PropertyForm;
