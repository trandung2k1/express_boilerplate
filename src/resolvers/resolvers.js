import { authors, books } from  '../data/data.js'
const resolvers = {
    Query: {
        books: async () => books,
        authors: async () => authors,
    },
    Book: {},
    Author: {},
    Mutation: {},
};

export default resolvers;
