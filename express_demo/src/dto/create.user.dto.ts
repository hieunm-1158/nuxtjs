import { Field, InputType } from 'type-graphql';
import { UserEntity } from '../entity/user.entity';

@InputType()
export class CreateUserDTO {
  public static entity = UserEntity.name;

  @Field({ nullable: false })
  readonly firstName: string;

  @Field({ nullable: false })
  readonly lastName: string;

  @Field({ nullable: false })
  readonly age: number;
}
