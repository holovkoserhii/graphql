const {GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList} = require('graphql')
const {find, filter} = require('lodash')

const books = [
    {name: 'Заповіт', genre: 'Література', id: '1', authorId: '2'},
    {name: 'Багатий тато, бідний тато', genre: 'Фінанси', id: '2', authorId: '3'},
    {name: 'Пригоди Робінзона Крузо', genre: 'Пригоди', id: '3', authorId: '1'},
    {name: 'Катерина', genre: 'Література', id: '4', authorId: '2'},
    {name: 'Гайдамаки', genre: 'Література', id: '5', authorId: '2'},
    {name: 'Квадрант грошового потоку', genre: 'Фінанси', id: '6', authorId: '3'},
]

const authors = [
    {name: 'Даніель Дефо', age: 70, id: '1'},
    {name: 'Тарас Шевченко', age: 46, id: '2'},
    {name: 'Роберт Кійосакі', age: 30, id: '3'},
]

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {
            type: GraphQLID
        },
        name: {
            type: GraphQLString
        },
        genre: {
            type: GraphQLString
        },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                // console.log(parent);
                return find(authors, {id: parent.authorId})
            }
        }
    })
})

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: {
            type: GraphQLID
        },
        name: {
            type: GraphQLString
        },
        age: {
            type: GraphQLInt
        },
        books: {
            type: new GraphQLList(BookType), // because there can be multiple books for one author
            resolve(parent, args) {
                return filter(books, {authorId: parent.id})
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve(parent, args) {
                console.log(args.id)
                // code to get data from db / other source
                // console.log(typeof(args.id));
                return find(books, {id: args.id})
            }
        },
        author: {
            type: AuthorType,
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve(parent, args) {
                return find(authors, {id: args.id})
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return books
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                return authors
            }
        },
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})