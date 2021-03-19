import { Field, ID, ObjectType, Root } from 'type-graphql';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  firstName: string;

  @Field()
  @Column()
  lastName: string;

  @Field()
  @Column('text', { unique: true })
  email: string;

  // not stored but is part of schema
  @Field()
  name(@Root() parent: User): string {
    return `${parent.firstName} ${parent.lastName}`;
  }

  // not annotated with @Field; is not in schema
  @Column()
  password: string;

  @Column('bool', { default: false })
  confirmed: boolean;
}
