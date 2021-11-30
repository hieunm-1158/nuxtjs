import { Exclude, Expose } from 'class-transformer';
import { ObjectType, Field, Int } from 'type-graphql';
import { UserDTO } from './user.dto';

@ObjectType()
@Exclude()
export class PostDTO {
  @Field(() => Int)
  @Expose()
  readonly id: number;

  @Field(() => String)
  @Expose()
  readonly title: String;

  @Field(() => String)
  @Expose()
  readonly content: String;

  @Field(() => UserDTO)
  @Expose()
  readonly author: UserDTO;
}
