const mongoose = require('mongoose');
const url = String(process.env.MONGODB_URI);
// if (process.argv.length < 3) {
//   console.log('give password as argument');
//   process.exit(1);
// }

// const password = process.argv[2];

// const url = `mongodb+srv://adamgparsons:${password}@cluster0-lhyea.mongodb.net/phonebook?retryWrites=true&w=majority`;

// node mongo.js yourpassword Anna 040-1234556
// const personName = process.argv[3];

// const personNumber = process.argv[4];

mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message);
  });

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});
module.exports = mongoose.model('Person', personSchema);
