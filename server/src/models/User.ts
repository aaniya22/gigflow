/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUserDocument extends Document {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'sales';
  createdAt: Date;
  comparePassword(candidate: string): Promise<boolean>;
}

const UserSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'sales'], default: 'sales' },
  },
  { timestamps: true }
);

UserSchema.pre('save', async function () {
  const self = this as any;
  if (!self.isModified('password')) return;
  const salt = await bcrypt.genSalt(12);
  self.password = await bcrypt.hash(self.password, salt);
});

UserSchema.methods['comparePassword'] = async function (candidate: string): Promise<boolean> {
  return bcrypt.compare(candidate, (this as any).password);
};

export default mongoose.model<IUserDocument>('User', UserSchema);