import 'dotenv/config';

import { Sequelize } from 'sequelize-typescript';

import { env } from './env';
import PostModel from './models/Post';
import { UserModel } from './models/User';

const { DATABASE_URL } = env;

const sequelize = new Sequelize(DATABASE_URL, {
  logging: false,
  // native: true,
});

UserModel(sequelize);
PostModel(sequelize);

const { User, Post } = sequelize.models;

User.hasMany(Post);
Post.belongsTo(User);

export { sequelize, User, Post };
