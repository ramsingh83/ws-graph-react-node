const graphql = require('graphql');
const _ =require('lodash');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLSchema,
  GraphQLList} = graphql;

// const Book = require('../models/books.model');
// const Author = require('../models/authors.model');

const books = [
  {name: 'book1', genre: 'genre1', id: '1', authorId: '2'},
  {name: 'book2', genre: 'genre2', id: '2', authorId: '2'},
  {name: 'book3', genre: 'genre3', id: '3', authorId: '1'},
  {name: 'book8', genre: 'genre4', id: '4', authorId: '3'},
  {name: 'book4', genre: 'genre1', id: '5', authorId: '4'},
  {name: 'book5', genre: 'genre2', id: '6', authorId: '4'},
  {name: 'book6', genre: 'genre3', id: '7', authorId: '1'},
  {name: 'book7', genre: 'genre4', id: '8', authorId: '3'}
];

const authors = [
  {name: 'Author1', location: 'mumbai', id: '1'},
  {name: 'Author2', location: 'delhi', id: '2'},
  {name: 'Author3', location: 'chennai', id: '3'},
  {name: 'Author4', location: 'hyderabd', id: '4'}
];

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id:{type: GraphQLID},
    name:{type: GraphQLString},
    genre:{type: GraphQLString},
    author:{
      type: AuthorType,
      resolve(parent, args){
        return _.find(authors, {id: parent.authorId});
        // DB
        // return Author.findById(parent.authorId);
      }
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id:{type: GraphQLID},
    name:{type: GraphQLString},
    location:{type: GraphQLString},
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args){
      return _.filter(books, {authorId: parent.id});
      // DB
      // return Book.find(authorId: parent.authorId);
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args){
        // implement DB
        // return Book.findById(args.id);
        return _.find(books, {id: args.id});
        
      }
    },
    author: {
      type: AuthorType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args){
        // implement DB
        // return Author.findById(args.id);
        return _.find(authors, {id: args.id});
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args){
        return books;
        // DB
        // return Book.find({});
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args){
        return authors;
        // DB
        // return Author.find({});
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: {type: GraphQLString},
        location: {type: GraphQLString}
      },
      resolve(parent, args){
        return authors.push({name: args.name, location: args.location, id: '123'});
        /* Save in MongoDB
        let author = new Auther({
          name: args.name,
          location: args.location,
          id: args.id
        });
        author.save();
        */
      }
    },
    addbook: {
      type: BookType,
      args: {
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        authorId: {type: GraphQLID}
      },
      resolve(parent, args){
        return books.push({name: args.name, genre: args.genre, id: 234, authorId: args.authorId});
        /* Save in MongoDB
        let book = new Book({
          name: args.name,
          genre: args.genre,
          authorId: args.authorId
        });
        author.save();
        */
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query:RootQuery,
  mutation: Mutation
});