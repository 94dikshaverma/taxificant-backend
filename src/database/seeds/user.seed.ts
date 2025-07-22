import { User, UserRole } from '@/modules/users/entities/user.entity';
import * as bcrypt from 'bcrypt';

export const userSeedData = async (): Promise<Partial<User>[]> => {
  const hashedPassword = await bcrypt.hash('password123', 10);

  return [
    {
      email: 'admin@taxificant.com',
      password: hashedPassword,
      firstName: 'Admin',
      lastName: 'User',
      role: UserRole.ADMIN,
      isActive: true,
    },
    {
      email: 'user@taxificant.com',
      password: hashedPassword,
      firstName: 'Regular',
      lastName: 'User',
      role: UserRole.USER,
      isActive: true,
    },
    {
      email: 'test@taxificant.com',
      password: hashedPassword,
      firstName: 'Test',
      lastName: 'User',
      role: UserRole.USER,
      isActive: true,
    },
  ];
};