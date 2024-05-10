import { defineConfig } from 'cypress';
import mongoose from 'mongoose';
import { Review } from '../kino-nextjs/app/lib/schema.js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        async removeTestComments() {
          const URL: string = process.env.DB_URL as string;
          await mongoose.connect(URL).catch((error) => {
            throw new Error(error);
          });
          const result = await Review.deleteMany({
            comment: 'success-1122334455',
          });
          await mongoose.connection.close();

          return result;
        },
      });
    },
    testIsolation: false,
  },
});

//connect to db
//remove comment containing success-1122334455 if possible after test is run.
