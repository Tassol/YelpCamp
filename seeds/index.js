const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Database connected');
});

const sample = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 200; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: '61c48919b4212852392baaac',
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto, modi doloribus, iusto perferendis reprehenderit et expedita magnam commodi, quos suscipit eum nam aspernatur atque? Itaque totam illum dolore accusamus dignissimos.',
      price,
      geometry: {
        type: 'Point',
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      images: [
        {
          url: 'https://res.cloudinary.com/dkwoesz1p/image/upload/v1640096984/YelpCamp/maffd3o4nrolmfehtfv2.jpg',
          filename: 'YelpCamp/maffd3o4nrolmfehtfv2',
        },
        {
          url: 'https://res.cloudinary.com/dkwoesz1p/image/upload/v1640096985/YelpCamp/jitytmmzbik7vhknluq5.jpg',
          filename: 'YelpCamp/jitytmmzbik7vhknluq5',
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
