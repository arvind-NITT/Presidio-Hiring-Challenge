import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/propertyitem.css';

const PropertyItem = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    // Fetch data from the server when the component mounts
    const fetchProperties = async () => {
      try {
        const response = await axios.get('/api/v1/buyer/get-property',  {
        headers: {
          'Content-Type': 'application/json',
           Authorization: localStorage.getItem('token'),
        },
      });
      console.log(response.data);
        setProperties(response.data.properties);
      } catch (error) {
        console.error('Failed to fetch properties:', error);
      }
    };

    fetchProperties();
  }, []);

  const toggleOwnerDetails = (index) => {
    setProperties((prevProperties) =>
      prevProperties.map((property, i) =>
        i === index ? { ...property, showOwnerDetails: !property.showOwnerDetails } : property
      )
    );
  };

  const handleInterest = async(propertyId,property) => {
    try {
        // Make POST request to backend with property data
        const response= await  axios.post('/api/v1/buyer/send-mail', {propertyData:property}, {
      headers: {
        'Content-Type': 'application/json',
         Authorization: localStorage.getItem('token'),
      },
    });
  
    if(response.status === 200){
      alert("Email Send Succesfull");
    }
    else{
      alert("Some error while sending the mail please try again");
    }
       
      } catch (error) {
        console.error('Error sending interest:', error);
        // Handle error if needed
        alert("Some server error while sending the mail please try again");
      }
  };

  return (
    <div className="property-item-container">
      {properties.map((property, index) => (
        <div key={property._id} className="property-card">
          <h3>{property.name}</h3>
          <p>{property.description}</p>
          <p><strong>Bedrooms:</strong> {property.numberOfBedrooms}</p>
          <p><strong>Bathrooms:</strong> {property.numberOfBathrooms}</p>
          <p><strong>Hospital Nearby:</strong> {property.hospitalNearby}</p>
          <p><strong>City:</strong> {property.city}</p>
          <button className="toggle-button" onClick={() => toggleOwnerDetails(index)}>
            {property.showOwnerDetails ? 'Hide Owner Details' : 'Show Owner Details'}
          </button>
          {property.showOwnerDetails && (
            <div className="owner-details">
              <p><strong>Owner Name:</strong> {property.owner.firstname} {property.owner.lastname}</p>
              <p><strong>Email:</strong> {property.owner.email}</p>
              <p><strong>Phone:</strong> {property.owner.phone}</p>
            </div>
          )}
          <button className="interest-button" onClick={() => handleInterest(property._id,property)}>I am Interested</button>
        </div>
      ))}
    </div>
  );
};

export default PropertyItem;
