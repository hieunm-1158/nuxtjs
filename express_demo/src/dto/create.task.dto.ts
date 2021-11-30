import { Field, InputType } from 'type-graphql';
import { TaskEntity } from '../entity/task.entity';

@InputType()
export class CreateTaskDTO {
  public static entity = TaskEntity.name;

  @Field()
  readonly content: string;

  @Field()
  readonly status: string;
}
