import { ApiProperty }                            from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @ApiProperty({
  	example: "2f29aa6b-2de0-4267-84af-b16309be597d",
  	title: "ID User",
  	uniqueItems: true,
  })
  @PrimaryGeneratedColumn("uuid")
  	id: string;

  @ApiProperty()
  @Column("text")
  	name: string;

  @ApiProperty()
  @Column("text")
  	lastName: string;

  @ApiProperty()
  @Column("text", {
  	unique: true,
  })
  	alias: string;

  @ApiProperty()
  @Column("text", {
  	unique: true,
  })
  	email: string;

  @ApiProperty()
  @Column("text")
  	password: string;

  @ApiProperty()
  @Column("text", {
  	array: true,
  	default: ["user", "consult"],
  })
  	roles: string[];

  @ApiProperty()
  @Column("boolean")
  	isActive: boolean;
}
