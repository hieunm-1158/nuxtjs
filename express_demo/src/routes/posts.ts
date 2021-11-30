import express from 'express';
import { UserEntity } from '../entity/user.entity';

const router = express.Router({ mergeParams: true });

router.get('/', async (req, res) => {
  const users = await UserEntity.findOne(req.params.userId);
  const { posts } = users;
  res.json(posts);
});

router.get('/:postId', async (req, res) => {
  try {
    const users = await UserEntity.findOne(req.params.userId);
    const { posts } = users;
    res.json(posts.find((post) => String(post.id) === req.params.postId));
  } catch (e) {
    res.json();
  }
});

export default router;
