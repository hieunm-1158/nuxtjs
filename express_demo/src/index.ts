/* eslint-disable no-console */
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { buildSchema } from 'type-graphql';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import users from './routes/users';
// import notFound from './routes/404';

// import { typeDefs } from './typeDefs';
import { UserResolver } from './resolvers/user.resolver';
import { PostResolver } from './resolvers/post.resolver';
import { TaskResolver } from './resolvers/task.resolver';
// import { User } from './entity/User';

// createConnection()
//   .then(async (connection) => {
//     console.log('Inserting a new user into the database...');
//     const user = new User();
//     user.firstName = 'Timber';
//     user.lastName = 'Saw';
//     user.age = 25;
//     await connection.manager.save(user);
//     console.log(`Saved a new user with id: ${user.id}`);

//     console.log('Loading users from the database...');
//     const users = await connection.manager.find(User);
//     console.log('Loaded users: ', users);

//     console.log('Here you can setup and run express/koa/any other framework.');
//   })
//   .catch((error) => console.log(error));

const port = process.env.PORT || 8080;

const startServer = async () => {
  const schema = await buildSchema({
    resolvers: [UserResolver, PostResolver, TaskResolver],
  });
  const server = new ApolloServer({
    schema,
    playground: {
      settings: {
        'schema.polling.enable': false,
        'request.credentials': 'include',
      },
    },
  } as any);

  await createConnection();

  const app = express();

  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());

  app.use('/users', users);
  // app.use(notFound);

  server.applyMiddleware({ app });

  app.listen(port, () => {
    console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`);  // eslint-disable-line
  });
};

startServer();
