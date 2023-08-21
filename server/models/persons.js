const mongoose = require('mongoose');

mongoose
  .connect(
    'mongodb+srv://weissenborn24seb:BMHxCDtYBSAYChJK@sw-mangodb.hltjnmb.mongodb.net/auth-protected-routes'
  )
  .then((result) => {
    console.log('connected to mongo database - It was a success!!!');
  })
  .catch((err) => {
    console.log('error connecting to database', err.message);
  });

  const personSchema = new mongoose.Schema({
      name: String,
      number: Number,
      photo: String
  })

  personSchema.set( 'toJSON' , {
    transform: (document, returnObj) => {
      returnObj.id = returnObj._id.toString();
      delete returnObj._id;
       delete returnsObj.__v;
    },
  });

  module.exports = mongoose.model('Person', personSchema)
