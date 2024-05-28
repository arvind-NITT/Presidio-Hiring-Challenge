import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/sellerproperty.css'; // CSS file for styling

const SellerProperty = () => {
  const [properties, setProperties] = useState([]);
  const [load, setLoad] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // New state for loading spinner
 const navigate = useNavigate();
  useEffect(() => {
    // Fetch data from the server when the component mounts
    const fetchProperties = async () => {
      try {
        // Retrieve the token from local storage
        const token = localStorage.getItem('token');

        // Send GET request to backend API with token in headers
        const response = await axios.get('/api/v1/seller/fetch-property', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setProperties(response.data.properties);
      } catch (error) {
        console.error('Failed to fetch properties:', error);
      } finally {
        setIsLoading(false); // Set loading to false after fetch is complete
      }
    };

    fetchProperties();
  }, [load]);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(`/api/v1/seller/delete-property/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.status === 200) {
        setLoad(!load); // Trigger re-fetch of properties
        alert("Property deleted successfully");
      } else {
        alert("Failed to delete property");
      }
    } catch (error) {
      console.error('Failed to delete property:', error);
    }
  };

  const handleUpdate = (id,property) => {
    console.log(property);
    navigate(`/update-property/${id}`, { state: { property } });
  };

  return (
    <div className="property-list">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        properties.map((property) => (
          <div key={property._id} className="property-card">
            <h3>{property.name}</h3>
            <p className="description">{property.description}</p>
            <p><strong>Bedrooms:</strong> {property.numberOfBedrooms}</p>
            <p><strong>Bathrooms:</strong> {property.numberOfBathrooms}</p>
            <p><strong>Hospital Nearby:</strong> {property.hospitalNearby}</p>
            <p><strong>City:</strong> {property.city}</p>
            <div className="card-buttons">
              <button className="update-button" onClick={() => handleUpdate(property._id,property)}>Update</button>
              <button className="delete-button" onClick={() => handleDelete(property._id)}>Delete</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default SellerProperty;
