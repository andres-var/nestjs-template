import { Injectable }       from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository }       from "typeorm";

import { User }        from "src/users/entities/user.entity";
import { initialData } from "./data/seed-data";

@Injectable()
export class SeedsService {
	constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
	) {}

	async runSeeds() {
		await this.deleteTables();

		await this.insertUsers();

		return "SEED EXECUTED";
	}

	private async deleteTables() {
		const queryBuilder = this.userRepository.createQueryBuilder();
		await queryBuilder.delete().where({}).execute();
	}

	private async insertUsers() {
		const seedUsers = initialData.users;

		const users: User[] = [];

		seedUsers.forEach((user) => {
			users.push(this.userRepository.create(user));
		});

		const dbUsers = await this.userRepository.save(seedUsers);

		return dbUsers;
	}
}
