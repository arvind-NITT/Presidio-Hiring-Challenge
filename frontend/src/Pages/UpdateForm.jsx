import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/updateForm.css'; // CSS file for form styling

const UpdateForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { property} = location.state || {};
  console.log(property);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    numberOfBedrooms: '',
    numberOfBathrooms: '',
    hospitalNearby: '',
    city: '',
  });

  useEffect(() => {
    if (property) {
      setFormData({
        name: property.name,
        description: property.description,
        numberOfBedrooms: property.numberOfBedrooms,
        numberOfBathrooms: property.numberOfBathrooms,
        hospitalNearby: property.hospitalNearby,
        city: property.city,
      });
    }
  }, [property]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`/api/v1/seller/update-property/${property._id}`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.status === 200) {
        alert("Property updated successfully");
        navigate('/own-property');
      } else {
        alert("Failed to update property");
      }
    } catch (error) {
      console.error('Failed to update property:', error);
    }
  };

  return (
    <div className="update-form-container">
      <h2>Update Property</h2>
      <form className="update-form" onSubmit={handleSubmit}>
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
        <button type="submit">Update Property</button>
      </form>
    </div>
  );
};

export default UpdateForm;
