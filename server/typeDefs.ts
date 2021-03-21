import { gql } from 'apollo-server'

export const typeDefs = gql`
    # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

    # This "Book" type defines the queryable fields for every book in our data source
    type Book {
        title: String
        author: String
    }

    type Anime {
        id: ID!
        title:String
    }

    type Query {
        books: [Book]
        animes: [Anime]
        anime(id: ID!): Anime
    }

    type AnimeUpdateResponse{
        success: Boolean!
        message: String
        anime: [Anime]
    }

    type Mutation {
        deleteAnime(animeId: ID!): AnimeUpdateResponse
        updateTitle(animeId: ID!, title: String): AnimeUpdateResponse
        createAnime(title: String): AnimeUpdateResponse
    }
`