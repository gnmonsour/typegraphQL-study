import { IsEmail, Length } from 'class-validator';
import { Field, InputType } from 'type-graphql';
import { IsEmailInUse } from './isUsedEmail';
import { PasswordInput } from './PasswordInput';

@InputType()
export class RegisterInput extends PasswordInput {
  @Field()
  @Length(1, 55)
  firstName: string;

  @Field()
  @Length(1, 55)
  lastName: string;

  @Field()
  @IsEmail()
  @IsEmailInUse({ message: 'not allowed, email is already in use' })
  email: string;
}
