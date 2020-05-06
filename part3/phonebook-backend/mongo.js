const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('give password as argument');
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://adamgparsons:${password}@cluster0-lhyea.mongodb.net/phonebook?retryWrites=true&w=majority`;

// node mongo.js yourpassword Anna 040-1234556
const personName = process.argv[3];

const personNumber = process.argv[4];

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }).then((result) => {
  console.log('connected to MongoDB');
})
.catch((error) => {
  console.log('error connecting to MongoDB:', error.message);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model('Person', personSchema);

const person = new Person({
  name: personName,
  number: personNumber,
});
//added Anna number 040-1234556 to phonebook
if (personName && personNumber) {
  person.save().then((response) => {
    console.log(`added ${personName} number ${personNumber} to the phonebook`);
    mongoose.connection.close();
  });
}

if (process.argv.length < 4) {
  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log(person);
    });
    mongoose.connection.close();
  });
}
