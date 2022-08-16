import * as bcrypt from 'bcryptjs';

export interface ISeedUser {
  name: string;
  lastName: string;
  alias: string;
  email: string;
  password: string;
  isActive: boolean;
  roles: string[];
}

export const initialUsers: ISeedUser[] = [
  {
    email: 'test1@google.com',
    name: 'Test',
    lastName: 'One',
    alias: 'Test One',
    isActive: true,
    password: bcrypt.hashSync('Abc123', 10),
    roles: ['admin'],
  },
  {
    email: 'test2@google.com',
    name: 'Test',
    lastName: 'Two',
    alias: 'Test Two',
    isActive: true,
    password: bcrypt.hashSync('Abc123', 10),
    roles: ['admin'],
  },
];
