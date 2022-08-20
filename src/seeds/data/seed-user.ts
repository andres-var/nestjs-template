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
    password: bcrypt.hashSync('asd123', 10),
    roles: ['super-admin'],
  },
  {
    email: 'test2@google.com',
    name: 'Test',
    lastName: 'Two',
    alias: 'Test Two',
    isActive: true,
    password: bcrypt.hashSync('asd123', 10),
    roles: ['admin'],
  },
  {
    email: 'test3@google.com',
    name: 'Test',
    lastName: 'three',
    alias: 'Test three',
    isActive: true,
    password: bcrypt.hashSync('asd123', 10),
    roles: ['user'],
  },
];
