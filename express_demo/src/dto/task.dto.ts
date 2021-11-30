import { Exclude, Expose } from 'class-transformer';
import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType()
@Exclude()
export class TaskDTO {
  @Field(() => ID)
  @Expose()
  readonly id: number;

  @Field(() => String)
  @Expose()
  readonly content: String;

  @Field(() => String)
  @Expose()
  readonly status: String;
}
