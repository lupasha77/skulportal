// Activity Logging Model
// src/models/ActivityLog.js
import { Schema, model } from 'mongoose';

const activityLogSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  action: {
    type: String,
    required: true,
    enum: ['login', 'logout', 'profile_update', 'password_change', 'failed_login']
  },
  details: {
    type: Object
  },
  ipAddress: String,
  userAgent: String,
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const ActivityLog = model('ActivityLog', activityLogSchema);