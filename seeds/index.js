const mongoose=require('mongoose');
const axios=require('axios');
const cities=require('./cities');
const {places,descriptors}=require('./seedHelpers')
const Campground=require('../models/campground');

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');

const db=mongoose.connection;
db.on("error",console.error.bind(console,"connection error"));
db.once("open",()=>{
    console.log("database connected");
});

const sample=array=>array[Math.floor(Math.random()*array.length)];

async function seedImg() {
    try {
      const resp = await axios.get('https://api.unsplash.com/photos/random', {
        params: {
          client_id: 'BSCE1vd8Yg7blzjy8jZflExh89GHTaxP-JCIcDmDG0c',
          collections: 1114848,
        },
      })
      return resp.data.urls.small
    } catch (err) {
      console.error(err)
    }
  }

const seedDB=async()=>{
    await Campground.deleteMany({});
    for(let i=0;i<300;i++){
      
        const random1000=Math.floor(Math.random()*1000);
        const price=Math.floor(Math.random()*20)+10;
        const camp=new Campground({
          author:'65d41966430df9ae6071dc83',
            location:`${cities[random1000].city},${cities[random1000].state}`,
            title:`${sample(descriptors)}${sample(places)}`,
            description:'loreLorem ipsum, dolor sit amet consectetur adipisicing elit. Et officiis temporibus consectetur. Similique, suscipit dolor. Eum similique quod, cum eos molestiae reprehenderit tenetur, quas itaque odit aliquid assumenda temporibus possimus?',
            price,
            geometry: { 
                type: 'Point', 
                coordinates:[
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [],
            images: [
              {
                url: 'https://res.cloudinary.com/ddbvfvgbk/image/upload/v1708588153/YelpCamp/ceayqmxntdtck7xzb7uf.webp',
                filename: 'YelpCamp/ceayqmxntdtck7xzb7uf',
              },
              {
                url: 'https://res.cloudinary.com/ddbvfvgbk/image/upload/v1708588154/YelpCamp/uh5s8nudinap0dro31qu.jpg',
                filename: 'YelpCamp/uh5s8nudinap0dro31qu',
              },
              {
                url: 'https://res.cloudinary.com/ddbvfvgbk/image/upload/v1708588154/YelpCamp/cij6qcftlkfcyundpjyr.jpg',
                filename: 'YelpCamp/cij6qcftlkfcyundpjyr',
              }
            ]
        });
        await camp.save();
    }
};
seedDB().then(()=>{
    mongoose.connection.close();
})