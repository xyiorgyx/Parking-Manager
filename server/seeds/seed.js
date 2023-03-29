const db = require('../config/connection');
const { User, Car} = require('../models');
const userSeed = require('./userSeed');
const carSeed = require('./carSeed.json');

db.once('open', async () => {
  try {
    await Car.deleteMany({});
    await User.deleteMany({});

    await User.create(userSeed);

    for (let i = 0; i < carSeed.length; i++) {
      const { _id, owner} = await Car.create(carSeed[i]);
      const user = await User.findOneAndUpdate(
        { username: owner },
        {
          $addToSet: {
            cars: _id,
          },
        }
      );
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});
