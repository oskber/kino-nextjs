import { defineConfig } from 'cypress';
import mongoose from 'mongoose';
import { Review, Screening } from '../kino-nextjs/app/lib/schema';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.test' });

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        async removeTestReviews() {
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

      on('task', {populateScreening});

    },
    testIsolation: false,
  },
});

const populateScreening = async () => {
  const URL: string = process.env.DB_URL as string;

  await mongoose.connect(URL).catch((error) => {
    throw new Error(error);
  });

  const today = new Date();
    let result = new Date(today.setHours(12 , 0, 0, 0))
    const screening = {
      MovieId: new mongoose.Types.ObjectId('6644b772c0de199904504ccf'),
      Date: result.toISOString(),
      Seats: [
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0],
        ],
      Bookings: []
    }

  const screeningModel = new Screening(screening)
  const data = await screeningModel.save()
  await mongoose.connection.close();
  return data
}

/*const removeScreening = async (id: string) => {

  await testScreening.findOneAndDelete({ MovieId: new mongoose.Types.ObjectId(id) })
}*/

//connect to db
//remove comment containing success-1122334455 if possible after test is run.
