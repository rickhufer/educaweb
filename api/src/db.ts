import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';
dotenv.config();

import { UserModel } from './models/User';
import PostModel from './models/Post';

const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_PORT, DB_SSL } = process.env;

const sequelize = new Sequelize({
  database: DB_NAME || '',
  username: DB_USER || '',
  password: DB_PASSWORD || '',
  host: DB_HOST || 'localhost',
  port: DB_PORT ? +DB_PORT : 5432,
  dialect: 'postgres',
  dialectOptions: {
    ssl: DB_SSL === 'true',
  },
  logging: false,
  // native: true,
});

UserModel(sequelize);
PostModel(sequelize);

const { User, Post } = sequelize.models;

User.hasMany(Post);
Post.belongsTo(User);

export { sequelize, User, Post };
