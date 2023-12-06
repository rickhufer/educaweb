import 'dotenv/config';

import { app } from './app';
import { sequelize } from './db';
import { env } from './env';

const PORT = env.PORT;

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
