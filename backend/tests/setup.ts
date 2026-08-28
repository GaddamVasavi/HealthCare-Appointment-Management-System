import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);
});

afterAll(async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
  if (mongoServer) {
    await mongoServer.stop();
  }
});

afterEach(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
});

export const createTestUser = async (role = 'patient', overrides = {}) => {
  const User = mongoose.model('User');
  const user = new User({
    name: 'Test User',
    email: `test${Date.now()}@example.com`,
    password: 'password123',
    role,
    ...overrides
  });
  await user.save();
  return user;
};

export const createTestDoctor = async (overrides = {}) => {
  return createTestUser('doctor', {
    specialty: 'Cardiology',
    experience: 10,
    ...overrides
  });
};

export const createTestPatient = async (overrides = {}) => {
  return createTestUser('patient', {
    dateOfBirth: new Date('1990-01-01'),
    contactNumber: '1234567890',
    ...overrides
  });
};

export const getAuthToken = (user: any) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET || 'test-secret',
    { expiresIn: '1h' }
  );
};
