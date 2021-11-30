import { Exclude, Expose } from 'class-transformer';
import { ObjectType, Field, Int } from 'type-graphql';
import { PostDTO } from './post.dto';

@ObjectType()
@Exclude()
export class UserDTO {
  @Field(() => Int)
  @Expose()
  readonly id: number;

  @Field(() => String)
  @Expose()
  readonly firstName: String;

  @Field(() => String)
  @Expose()
  readonly lastName: String;

  @Field(() => Int)
  @Expose()
  readonly age: number;

  @Field(() => [PostDTO], { nullable: true })
  @Expose()
  readonly posts: PostDTO[];
}
