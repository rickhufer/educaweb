import app from './app';
import { sequelize } from './db';

const PORT = process.env.PORT || 3001;

sequelize
  .sync(
    { alter: true },
    // { force: true },
  )
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  });
