const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error",console.error.bind(console,"connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = (array) => {
    return array[Math.floor(Math.random()* array.length)];
}

const seedDB = async() =>{
    await Campground.deleteMany({});
    for (let i=0; i<50; i++){
        const random1000 = Math.floor(Math.random()*1000);
        const price = Math.floor(Math.random()*20)+10;
        const camp = new Campground({
            author: '61bb498b64f2aec8e8bd61cc',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: 'https://source.unsplash.com/collection/9046579/',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto, modi doloribus, iusto perferendis reprehenderit et expedita magnam commodi, quos suscipit eum nam aspernatur atque? Itaque totam illum dolore accusamus dignissimos.',
            price,
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})