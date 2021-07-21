const express = require('express');
const {graphqlHTTP} = require('express-graphql')
const schema = require('./schema/schema')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

const app = express();


mongoose.connect(process.env.DB_CONNECTION, {useUnifiedTopology: true,  useNewUrlParser: true }, ()=>{
    console.log("connected to the database")
})

app.use('/graphql',graphqlHTTP({
    schema,
    graphiql:true
}))
app.listen(4000, ()=>{
    console.log('App runing at 4000')
})