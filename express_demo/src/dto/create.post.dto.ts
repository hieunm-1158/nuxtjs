import { Field, InputType } from 'type-graphql';
import { PostEntity } from '../entity/post.entity';

@InputType()
export class CreatePostDTO {
  public static entity = PostEntity.name;

  @Field({ nullable: false })
  readonly title: string;

  @Field({ nullable: false })
  readonly content: string;

  @Field({ nullable: false })
  readonly author: number;
}
