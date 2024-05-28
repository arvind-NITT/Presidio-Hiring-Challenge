import mongoose from "mongoose";
import Property from "../models/property.model.js";
import User from "../models/user.model.js";
// Controller function to handle property creation
const addProperty = async (req, res) => {
    try {
      // Extract property details from request body
      //console.log(req.body);
      const {
        name,
        description,
        numberOfBedrooms,
        numberOfBathrooms,
        hospitalNearby,
        city,
      } = req.body;
  
      // Assuming owner ID is set based on authentication (you may adjust this logic as per your authentication setup)
      const owner = req.user.userId; // Assuming authenticated user's ID is available in req.user.id
      //console.log(owner);
      // Create new property instance
      const newProperty = new Property({
        name,
        description,
        numberOfBedrooms,
        numberOfBathrooms,
        hospitalNearby,
        city,
        owner,
      });
  
      await newProperty.save();
  
      res.status(200).json({ message: 'Property added successfully', property: newProperty });
    } catch (error) {
      // Handle error
      console.error('Failed to add property:', error);
      res.status(500).json({ error: 'Failed to add property' });
    }
  };
  

  
const fetchProperty = async (req, res) => {
    try {

      const userId = req.user.userId;
      //console.log(userId);
     
      const properties = await Property.find({ owner: userId });
  
      
      res.status(200).json({ properties });
    } catch (error) {
      console.error('Failed to fetch properties:', error);
      res.status(500).json({ error: 'Failed to fetch properties' });
    }
  };
  const deleteProperty = async(req,res)=>{
    try {
        // Extract the property ID from the request parameters
        const propertyId = req.params.id;
    
        // Find the property by ID and delete it
        const property = await Property.findByIdAndDelete(propertyId);
    
        // Check if the property exists
        if (!property) {
          return res.status(404).json({ error: 'Property not found' });
        }
    
        // Send a success response
        res.status(200).json({ message: 'Property deleted successfully' });
      } catch (error) {
        console.error('Failed to delete property:', error);
        res.status(500).json({ error: 'Failed to delete property' });
      }
  };
  const updateProperty =async (req,res)=>{
    const propertyId = req.params.id;
    const ownerId = req.user.userId;
    const { name, description, numberOfBedrooms, numberOfBathrooms, hospitalNearby, city } = req.body;
  
    try {
      // Find the property by ID and ensure it exists
      const property = await Property.findById(propertyId);
  
      if (!property) {
        return res.status(404).json({ error: 'Property not found' });
      }
  
      // Check if the logged-in user is the owner of the property
      if (property.owner.toString() !== ownerId) {
        return res.status(403).json({ error: 'You are not authorized to update this property' });
      }
  
      // Update the property fields
      property.name = name || property.name;
      property.description = description || property.description;
      property.numberOfBedrooms = numberOfBedrooms || property.numberOfBedrooms;
      property.numberOfBathrooms = numberOfBathrooms || property.numberOfBathrooms;
      property.hospitalNearby = hospitalNearby || property.hospitalNearby;
      property.city = city || property.city;
  
      // Save the updated property
      await property.save();
  
      // Send a success response
      res.status(200).json({ message: 'Property updated successfully', property });
    } catch (error) {
      console.error('Failed to update property:', error);
      res.status(500).json({ error: 'An error occurred while updating the property' });
    }
  }
  export { 
    addProperty, 
    fetchProperty,
    deleteProperty,
    updateProperty
 };
