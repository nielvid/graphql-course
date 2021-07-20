const graphql = require('graphql');
const _ = require('lodash') //utilty library

const {GraphQLObjectType,  GraphQLString, GraphQLSchema} = graphql;

var Books = [
    {name: "the ImpactPreneur", id:"1"},
    {name: "How to Learn graphql", id:"2"},
    {name: "Employee handbook", id:"3"}
]

const BookType = new GraphQLObjectType({
    name: "Book",
    fields:()=>({
        id: {type: GraphQLString },
        name: {type: GraphQLString },
        genre: {type: GraphQLString }

    })
})

const RootQuery = new GraphQLObjectType({
    name : 'RootQueryType',
    fields:{
        book:{
            type: BookType,
            args: { id: {type: GraphQLString}},
            resolve(parent, args){

                // const book = Books.find((b)=>{ return b.id === "2"})
                // return book
                return _.find(Books, {id:args.id})                //code to get data from db/or other source
            }
        }
    }
})

module.exports = new GraphQLSchema({query: RootQuery})