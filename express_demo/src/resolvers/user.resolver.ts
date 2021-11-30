import { Resolver, Mutation, Query, Arg } from 'type-graphql';
import { CreateUserDTO } from '../dto/create.user.dto';
import { UserEntity } from '../entity/user.entity';
import { UserDTO } from '../dto/user.dto';

@Resolver()
export class UserResolver {
  @Query(() => UserDTO)
  async user(@Arg('id') id: number) {
    const data = await UserEntity.findOne({ where: { id } });
    return data;
  }

  @Query(() => [UserDTO])
  async getUserAll() {
    try {
      const data = await UserEntity.find();
      return data;
    } catch {
      return {};
    }
  }

  @Mutation(() => UserDTO)
  async createUser(@Arg('user') createUserDTO: CreateUserDTO) {
    const { firstName, lastName, age } = createUserDTO;
    const user = UserEntity.create({
      firstName,
      lastName,
      age,
    });
    await user.save();
    return user;
  }

  @Mutation(() => [UserDTO])
  async deleteUser(@Arg('id') id: number) {
    const data = await UserEntity.findOne({ where: { id } });
    await UserEntity.delete({ id });
    return data;
  }

  @Mutation(() => UserDTO)
  async updatePost(
    @Arg('id') id: number,
    @Arg('firstName') firstName: string,
    @Arg('lastName') lastName: string,
    @Arg('age') age: number
  ) {
    await UserEntity.update({ id }, { firstName, lastName, age });
    const data = await UserEntity.findOne({ where: { id } });
    return data;
  }
}
