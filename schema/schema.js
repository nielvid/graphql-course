const graphql = require('graphql');
const _ = require('lodash') //utilty library

const {GraphQLObjectType, GraphQLID,  GraphQLString, GraphQLInt, GraphQLSchema} = graphql;

var authors = [
    {name: "John Papa", age: 34, id:"1"},
    {name: "Adewale Bisi", age: 40, id:"2"},
    {name: "Samson Grant", age: 45, id:"3"},
     {name: "Kate Henshaw", age: 50, id:"4"}
]


var Books = [
      {name: "Leadership 101", id:"1", published:'2021', author: "1"},
    {name: "Starting strong", id:"2", published:'2020', author: "2"},
    {name: "How to Learn graphql", id:"3", published:'2019' ,author: "3"},
    {name: "Employee handbook", id:"4", published:'2011', author: "4"},
    {name: "Php is cool to learn", id:"5", published:'2019' ,author: "2"},
    {name: "Javascript Logi", id:"6", published:'2011', author: "1"},
    {name: "Programming made easy", id:"7", published:'2018' ,author: "3"},
    {name: "Don't Quit, Try harder", id:"8", published:'2011', author: "2"}
]

const BookType = new GraphQLObjectType({
    name: "Book",
    fields:()=>({
        id: {type: GraphQLString },
        name: {type: GraphQLString },
        published: {type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args){
                // console.log(parent)
                return _.find(authors, {id:parent.id})
            }
        }

    })
})

const AuthorType = new GraphQLObjectType({
    name: "author",
    fields:()=>({
        id: {type: GraphQLString },
        name: {type: GraphQLString },
        age: {type: GraphQLInt },
        books:{
            type: new graphql.GraphQLList(BookType),
            resolve(parent, arg){
                return _.filter(Books, {author: parent.id})
            }
        }

    })
})

const RootQuery = new GraphQLObjectType({
    name : 'RootQueryType',
    fields:{
        book:{
            type: BookType,
            args: { id: {type: GraphQLString}},
            resolve(parent, args){

                return _.find(Books, {id:args.id})                //code to get data from db/or other source
            }
        },
        author:{
            type: AuthorType,
            args: { id: {type: GraphQLID}},
            resolve(parent, args){

                // const book = Books.find((b)=>{ return b.id === "2"})
                // return book
                return _.find(authors, {id:args.id})                //code to get data from db/or other source
            }
        },
        
    }
})

module.exports = new GraphQLSchema({query: RootQuery})

