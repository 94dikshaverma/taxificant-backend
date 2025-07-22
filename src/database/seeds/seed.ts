import { AppDataSource } from '../data-source';
import { User } from '@/modules/users/entities/user.entity';
import { userSeedData } from './user.seed';

async function runSeeds() {
  console.log('🌱 Starting database seeding...');

  try {
    // Initialize data source
    await AppDataSource.initialize();
    console.log('✅ Database connected');

    // Get repositories
    const userRepository = AppDataSource.getRepository(User);

    // Clear existing data (optional - be careful in production)
    console.log('🗑️ Clearing existing data...');
    await userRepository.clear();

    // Seed users
    console.log('👥 Seeding users...');
    const users = await userSeedData();
    const savedUsers = await userRepository.save(users);
    console.log(`✅ Created ${savedUsers.length} users`);

    console.log('🎉 Seeding completed successfully!');
  } catch (error) {
    console.error('❌ Error during seeding:', error);
    process.exit(1);
  } finally {
    await AppDataSource.destroy();
  }
}

runSeeds();