const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');

const app = express();

const dbUri = 'mongodb+srv://test-user:test123@hs-cluster.xjrbf.mongodb.net/graphql-trial?retryWrites=true&w=majority'
mongoose.connect(dbUri);


app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true //opens a dummy graphical tool to play with GraphQL
}));

const port = 4000;
app.listen(port, () => {
    console.log(`now listening for requests on port ${port}`);
})

console.log('VIRUS !!!')