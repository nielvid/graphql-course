const graphql = require('graphql');
const _ = require('lodash') //utilty library
const Book = require('../models/book.js')
const Author = require('../models/author')

const {GraphQLObjectType, GraphQLID,  GraphQLString,
 GraphQLInt, GraphQLNonNull, GraphQLList, GraphQLSchema} = graphql;

const BookType = new GraphQLObjectType({
    name: "Book",
    fields:()=>({
        id: {type: GraphQLString },
        title: {type: GraphQLString },
        published: {type: GraphQLString },
        author: {
            type: new GraphQLNonNull(AuthorType) ,
            resolve(parent, args){
            return Author.findById(parent.author)
                
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
            type: GraphQLList(BookType),
            resolve(parent, arg){
                return Book.find({author: parent.id})
               
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
                return Book.findById(args.id)       
            }
        },
        author:{
            type: AuthorType,
            args: { id: {type: GraphQLID}},
            resolve(parent, args){
                return Author.findById(args.id)
            }
        },
        books:{
            type: new GraphQLList(BookType),
            resolve(parent, args){
                return Book.find()
            }
        },
         authors:{
            type: new GraphQLList(AuthorType),
            resolve(parent, args){
                return Author.find()
            }
        },
    }
})

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields:{
        addAuthor :{
            type : AuthorType,
            args: {
                name :{type: GraphQLString},
                age :{type: GraphQLInt}
                // books: {args.books}
            },
             resolve(parent, args){
                let author = new Author({
                name: args.name, 
                age: args.age
                // books: args.books
                })
             return  Author.create(author)  
            }

        },
        addBook :{
            type : BookType,
            args: {
                title: {type: GraphQLString},
                published: {type: GraphQLString},
                author: {type: GraphQLString}
                },
            resolve(parent, args){
                let book = new Book({
                    title: args.title,
                    published: args.published,
                    author: args.author
                    })
                return Book.create(book)
                }

            }
        }
    

})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})

