import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    usersController = module.get<UsersController>(UsersController);
  });

  describe('Users findAll', () => {
    it('should return an array of users', async () => {
      const result = 'This action returns all users';
      jest.spyOn(usersController, 'findAll').mockImplementation(() => result);

      expect(await usersService.findAll()).toBe(result);
    });
  });
});
