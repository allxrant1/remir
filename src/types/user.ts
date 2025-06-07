export type UserRole = 'visitor' | 'member' | 'ministry_user' | 'ministry_leader' | 'social_media';

export interface Ministry {
  id: string;
  name: string;
  description: string;
  leaders: string[]; // user IDs
  members: string[]; // user IDs
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  ministries?: string[]; // IDs of ministries the user belongs to
  isLeaderOf?: string[]; // IDs of ministries the user leads
  createdAt: Date;
  lastLogin: Date;
  isActive: boolean;
  avatar?: string;
  // Campos específicos para membros
  phone?: string;
  address?: string;
  birthDate?: Date;
  baptismDate?: Date;
  // Campos específicos para usuários de ministério
  skills?: string[];
  availability?: string[];
  // Campos específicos para social media
  socialNetworks?: {
    instagram?: string;
    facebook?: string;
    youtube?: string;
  };
}
