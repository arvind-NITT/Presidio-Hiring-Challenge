import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  numberOfBedrooms: {
    type: String,
    required: true,
  },
  numberOfBathrooms: {
    type:String,
    required: true,
  },
  hospitalNearby: {
    type: String,
  },
  city: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true, // Automatically include createdAt and updatedAt fields
});

const Property = mongoose.model('Property', propertySchema);

export default Property;
