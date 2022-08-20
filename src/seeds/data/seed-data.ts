import { initialUsers, ISeedUser } from './seed-user';

export interface ISeedData {
  users: ISeedUser[];
}

export const initialData: ISeedData = {
  users: initialUsers,
};
