import mongoose from 'mongoose';

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    profilePicUrl: { type: String },
    role: { type: String, default: 'user', enum: ['user', 'root', 'seller'] },
    resetToken: { type: String },
    expireToken: { type: Date },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('User', UserSchema);
