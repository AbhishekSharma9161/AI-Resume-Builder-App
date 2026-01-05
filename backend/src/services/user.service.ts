import { prisma } from '../prisma/client';

export class UserService {
  static async findUserById(id: string) {
    return await prisma.user.findUnique({
      where: { id },
      include: {
        resumes: {
          orderBy: { updatedAt: 'desc' }
        }
      }
    });
  }

  static async createUser(id: string, email: string, name?: string) {
    return await prisma.user.create({
      data: {
        id,
        email,
        name: name || email.split('@')[0]
      }
    });
  }

  static async updateUser(id: string, data: { name?: string }) {
    return await prisma.user.update({
      where: { id },
      data
    });
  }

  static async ensureUserExists(supabaseUserId: string, email: string) {
    const existingUser = await this.findUserById(supabaseUserId);
    
    if (!existingUser) {
      return await this.createUser(supabaseUserId, email);
    }
    
    return existingUser;
  }
}