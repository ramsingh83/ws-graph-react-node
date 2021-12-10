const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');

// TODO:  Connect with DB
/*const mongoose = require('mongoose');
mongoose.connect('connection string');
mongoose.connection.once('open', () => {
  console.log('connected to database');
}); */


const app = express();

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

app.listen(4000, () => {
    console.log('listening on 4000');
});