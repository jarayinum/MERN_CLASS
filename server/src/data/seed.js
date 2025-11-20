import { connectDB } from '../config/db.js';
import { User } from '../models/User.js';
import { seedUsers } from './seedUsers.js';

const seed = async () => {
  try {
    await connectDB();
    await User.deleteMany({});
    await User.insertMany(seedUsers);
    console.log(`Seeded ${seedUsers.length} users`);
  } catch (error) {
    console.error('Seeding failed', error);
  } finally {
    process.exit(0);
  }
};

seed();

