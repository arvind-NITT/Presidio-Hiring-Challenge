import mongoose from "mongoose";
import Property from "../models/property.model.js";
import nodemailer from  'nodemailer';
import User from "../models/user.model.js";


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'shivammca10032000@gmail.com',
      pass: 'tlfcrxwchmkxnfcy'
    }
  });

  const sendEmail = async (to,data) => {
    try {
      // Send mail with defined transport object
      const info = await transporter.sendMail({
        from: 'shivammca10032000@gmail.com',
        to:to,
        subject: "Real Estate Property Dealing ",
        html:data,
      });
  
      console.log('Email sent: %s', info.messageId);
      return info.messageId;
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  };

const getProperty = async(req,res)=>{
    const userId = req.user.userId;

    try {
      // Fetch properties not belonging to the current user and populate owner details
      const properties = await Property.find({ owner: { $ne: userId } })
                                       .populate('owner', 'firstname lastname email phone');
  
      if (!properties) {
        return res.status(404).json({ message: 'Properties not found' });
      }
  
      res.status(200).json({ properties });
    } catch (error) {
      console.error('Failed to fetch properties:', error);
      res.status(500).json({ error: 'Failed to fetch properties' });
    }

}
const sendMail = async (req, res) => {
    try {
      console.log(req.body.propertyData);
      console.log(req.user);
  
      const user = await User.findById(req.user.userId);
  
      const emailContentforBuyer = `
        <p>Hello,</p>
        <p>You are interested in one of the properties, so I have sent some details regarding this property. Please check the details and contact the seller.</p>
        <h2>Property Details</h2>
        <h3>Owner Details:</h3>
        <ul>
          <li>First Name: ${req.body.propertyData.owner.firstname} ${req.body.propertyData.owner.lastname}</li>
          <li>Email: ${req.body.propertyData.owner.email}</li>
          <li>Phone: ${req.body.propertyData.owner.phone}</li>
          <!-- Add more data fields here as needed -->
        </ul>
        <h3>Thank you.</h3>
      `;
  
      const emailContentforSeller = `
        <p>Hello,</p>
        <p>Someone is interested in your property "${req.body.propertyData.name}". Please contact them.</p>
        <h3>Buyer Details:</h3>
        <ul>
          <li>Name: ${user.firstname} ${user.lastname}</li>
          <li>Email: ${user.email}</li>
          <li>Phone: ${user.phone}</li>
        </ul>
        <h3>Thank you.</h3>
      `;
  
      // Send emails to property owner and buyer
      const ownerEmail = sendEmail(req.body.propertyData.owner.email, emailContentforSeller);
      if (!ownerEmail) {
        throw new Error("Something went wrong while sending the mail to the Seller");
      }
  
      const buyerEmail = sendEmail(user.email, emailContentforBuyer);
      if (!buyerEmail) {
        throw new Error("Something went wrong while sending the mail to the Buyer");
      }
  
      // Send a simple success response
      res.status(200).json({ message: "Mail sent successfully" });
    } catch (error) {
      console.log("Server error while sending mail:", error);
      res.status(500).json({ error: "Server error while sending mail" });
    }
  };
  
export {
    getProperty,
    sendMail
}