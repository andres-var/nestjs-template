import { BcryptAdapter } from 'src/common/adapters/bcrypt.adapter';
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

const bcrypt = new BcryptAdapter();

export const initialUsers: ISeedUser[] = [
  {
    email: 'development@inprodi.com',
    name: 'Development',
    lastName: 'Inprodi',
    alias: 'Dev',
    isActive: true,
    password: bcrypt.hashSync(PASSWORD),
    roles: ['super-admin', 'admin'],
  },
  {
    email: 'test2@google.com',
    name: 'Test',
    lastName: 'Two',
    alias: 'Test Two',
    isActive: true,
    password: bcrypt.hashSync(PASSWORD),
    roles: ['admin'],
  },
  {
    email: 'test3@google.com',
    name: 'Test',
    lastName: 'three',
    alias: 'Test three',
    isActive: true,
    password: bcrypt.hashSync(PASSWORD),
    roles: ['user'],
  },
  //   ...Array.from({ length: 1000 }).map((value, index) => ({
  //     email: faker.internet.exampleEmail().toLowerCase(),
  //     name: faker.name.firstName(),
  //     lastName: faker.name.lastName(),
  //     alias: faker.internet.userName(),
  //     isActive: true,
  //     password: bcrypt.hashSync(PASSWORD),
  //     roles: ['user'],
  //   })),
];
