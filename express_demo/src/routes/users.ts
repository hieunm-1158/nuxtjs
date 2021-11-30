import express from 'express';
import posts from './posts';
import { UserEntity } from '../entity/user.entity';

const router = express.Router({ mergeParams: true });

router.get('/', async (req, res) => {
  const users = await UserEntity.find();
  res.json(users);
});

router.get('/:userId', async (req, res) => {
  console.log(req.headers.referer);  // eslint-disable-line
  const users = await UserEntity.findOne(req.params.userId);
  res.json(users);
});

router.use('/:userId/posts', posts);

export default router;
