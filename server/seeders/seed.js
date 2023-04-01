const db = require('../config/connection');
const { User, Car, Lot, Space} = require('../models');
const userSeed = require('./userSeed');
const carSeed = require('./carSeed.json');
const lotSeed = require('./lotSeed.json');
const spaceSeed = require('./spaceSeed.json');

db.once('open', async () => {
  try {
    await Car.deleteMany({});
    await User.deleteMany({});
    await Space.deleteMany({});
    await User.create(userSeed);
    await Lot.create(lotSeed);
    await Car.create(carSeed);
    


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
    };
    
    for (let i = 0; i < spaceSeed.length; i++) {
      const { _id, parkingLot} = await Space.create(spaceSeed[i]);
      const spaceLot = await Lot.findOneAndUpdate(
        { lotName: parkingLot },
        {
          $addToSet: {
            lotSpaces: _id,
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
