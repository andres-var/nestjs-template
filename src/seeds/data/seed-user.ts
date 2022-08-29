import * as bcrypt from 'bcryptjs';
// import { faker } from '@faker-js/faker';

export interface ISeedUser {
  name: string;
  lastName: string;
  alias: string;
  email: string;
  password: string;
  isActive: boolean;
  roles: string[];
}

const PASSWORD = 'Asd123';

export const initialUsers: ISeedUser[] = [
  {
    email: 'development@inprodi.com',
    name: 'Development',
    lastName: 'Inprodi',
    alias: 'Dev',
    isActive: true,
    password: bcrypt.hashSync(PASSWORD, 10),
    roles: ['super-admin', 'admin'],
  },
  {
    email: 'test2@google.com',
    name: 'Test',
    lastName: 'Two',
    alias: 'Test Two',
    isActive: true,
    password: bcrypt.hashSync(PASSWORD, 10),
    roles: ['admin'],
  },
  {
    email: 'test3@google.com',
    name: 'Test',
    lastName: 'three',
    alias: 'Test three',
    isActive: true,
    password: bcrypt.hashSync(PASSWORD, 10),
    roles: ['user'],
  },
  //   ...Array.from({ length: 1000 }).map((value, index) => ({
  //     email: faker.internet.exampleEmail().toLowerCase(),
  //     name: faker.name.firstName(),
  //     lastName: faker.name.lastName(),
  //     alias: faker.internet.userName(),
  //     isActive: true,
  //     password: bcrypt.hashSync(PASSWORD, 10),
  //     roles: ['user'],
  //   })),
];
