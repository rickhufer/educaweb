import { Sequelize, DataTypes, Model } from 'sequelize';
import bcrypt from 'bcrypt';

interface UserAttributes {
  id: number;
  email: string;
  password: string;
  isActive: boolean;
}

interface UserModelInstance extends Model<UserAttributes>, UserAttributes {}

const UserModel = (sequelize: Sequelize) => {
  const User = sequelize.define<UserModelInstance>(
    'User',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value: string) {
          const saltRounds = 10;
          const hashedPassword = bcrypt.hashSync(value, saltRounds);
          this.setDataValue('password', hashedPassword);
        },
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      timestamps: false,
    },
  );

  return User;
};

export { UserModel, UserModelInstance };
