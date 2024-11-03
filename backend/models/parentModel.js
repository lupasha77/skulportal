// backend/models/parentModel.js
import { Schema, model } from 'mongoose';

const parentSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
  },
  students: [{
    type: Schema.Types.ObjectId,
    ref: 'Student'
  }],
}, { timestamps: true });

const Parent = model('Parent', parentSchema);
export default Parent;