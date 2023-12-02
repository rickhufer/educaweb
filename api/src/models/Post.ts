import { DataTypes } from 'sequelize';

const PostModel = (seq: any) => {
  seq.define(
    'Post',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      body: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: false },
  );
};

export default PostModel;
