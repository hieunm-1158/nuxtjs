import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import { CreatePostDTO } from '../dto/create.post.dto';
import { PostDTO } from '../dto/post.dto';
import { PostEntity } from '../entity/post.entity';
import { UserEntity } from '../entity/user.entity';

@Resolver()
export class PostResolver {
  @Query(() => PostDTO)
  async post(@Arg('id') id: number) {
    try {
      const data = await PostEntity.findOne({ where: { id } });
      return data;
    } catch {
      return {};
    }
  }

  @Query(() => [PostDTO])
  async getPostAll() {
    try {
      const data = await PostEntity.find();
      return data;
    } catch {
      return {};
    }
  }

  @Mutation(() => PostDTO)
  async createPost(@Arg('post') createPostDTO: CreatePostDTO) {
    const { title, content, author } = createPostDTO;
    const user = await UserEntity.findOne({ where: { id: author } });
    const post = PostEntity.create({ title, content });
    post.author = user;
    // if (!user.posts) user.posts = [];
    // user.posts.push(post);
    await post.save();
    return post;
  }

  @Mutation(() => [PostDTO])
  async deletePost(@Arg('id') id: number) {
    const data = await PostEntity.findOne({ where: { id } });
    await PostEntity.delete({ id });
    return data;
  }

  @Mutation(() => PostDTO)
  async updatePost(
    @Arg('id') id: number,
    @Arg('title') title: string,
    @Arg('content') content: string,
    @Arg('authorId') authorId: number
  ) {
    const author1 = await UserEntity.findOne({ where: { id: authorId } });
    await PostEntity.update({ id }, { title, content, author: author1 });
    const data = await PostEntity.findOne({ where: { id } });
    return data;
  }
}
