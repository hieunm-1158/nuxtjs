import { Resolver, Query, Mutation, Arg, ID } from 'type-graphql';
import { TaskEntity } from '../entity/task.entity';
import { CreateTaskDTO } from '../dto/create.task.dto';
import { TaskDTO } from '../dto/task.dto';

@Resolver()
export class TaskResolver {
  @Query(() => TaskDTO)
  async getTaskById(@Arg('id') id: number) {
    try {
      const data = await TaskEntity.findOne({ where: { id } });
      return data;
    } catch {
      return {};
    }
  }

  @Query(() => [TaskDTO])
  async getTaskAll() {
    try {
      const data = await TaskEntity.find();
      return data;
    } catch {
      return {};
    }
  }

  @Mutation(() => TaskDTO)
  async createTask(@Arg('task') createTaskDTO: CreateTaskDTO) {
    const { content, status } = createTaskDTO;
    const task = TaskEntity.create({ content, status });
    await task.save();
    return task;
  }

  @Mutation(() => TaskDTO)
  async deleteTask(@Arg('id', (_type) => ID) id: number) {
    const data = await TaskEntity.findOne({ where: { id } });
    await TaskEntity.delete({ id });
    return data;
  }

  @Mutation(() => TaskDTO)
  async updateTask(
    @Arg('id', (_type) => ID) id: number,
    @Arg('content') content: string,
    @Arg('status') status: string
  ) {
    await TaskEntity.update({ id }, { content, status });
    const data = await TaskEntity.findOne({ where: { id } });
    return data;
  }
}
