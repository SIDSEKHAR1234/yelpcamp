const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers')
const Campground = require('../models/campground')

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            //USER ID
            author: '603bba32aaa58a60380e8819',
            location: `${cities[random1000].city},${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: ' Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit asperiores earum at assumenda commodi aliquam, autem consequuntur quos ipsam fugit deserunt nobis, ad quam ea quibusdam beatae soluta voluptates doloribus!',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/siddhartha/image/upload/v1614712933/YelpCamp/dpd9bhvoyridn9vw5nj9.jpg',
                    filename: 'YelpCamp/dpd9bhvoyridn9vw5nj9'
                },
                {
                    url: 'https://res.cloudinary.com/siddhartha/image/upload/v1614712935/YelpCamp/cfeumptm5v9wpym97ran.jpg',
                    filename: 'YelpCamp/cfeumptm5v9wpym97ran'
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close()
});