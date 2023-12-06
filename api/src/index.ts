import 'dotenv/config';

import { app } from './app';
import { sequelize } from './db';
import { env } from './env';

const PORT = env.PORT || 3001;

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
