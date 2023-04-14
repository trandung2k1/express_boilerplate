const typeDefs = `#graphql
    type Book {
        id: ID!
        title: String
        genre: String
        author: Author
    }
    type Author {
        id: ID!
        name: String
        age: Int
        books: [Book]
    }
    type Query {
        books: [Book]
        authors: [Author]
        author(id: ID!): Author
        book(id: ID!): Book
    }
    type Mutation {
        createAuthor(name: String, age: Int): Author
        createBook(title: String, genre: String, authorId: ID!): Book
    }
`;
export default typeDefs;
