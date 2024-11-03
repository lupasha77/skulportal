import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  role: {
    type: String,
    enum: ['parent', 'student', 'admin'],
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  isVerified: { 
    type: Boolean, 
    default: false 
  }, // Email verification
}, { timestamps: true });

// Password Hashing Middleware
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare passwords
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Method to generate a JWT token
userSchema.methods.generateAuthToken = function() {
  return jwt.sign({ id: this._id, role: this.role }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

const User = model('User', userSchema);
export default User;
