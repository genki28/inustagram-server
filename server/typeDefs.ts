import { gql } from 'apollo-server'

export const typeDefs = gql`
    ## query
    type Book {
        title: String
        author: String
    }

    type Anime {
        id: ID
        title: String
        hero: String
    }

    type Query {
        books: [Book]
        animes: [Anime]
        anime(id: ID!): Anime
    }

    ## mutation
    type AnimeUpdateResponse{
        success: Boolean!
        message: String
        anime: [Anime]
    }

    type Mutation {
        deleteAnime(animeId: ID!): AnimeUpdateResponse
        updateAnime(animeId: ID!, title: String, hero: String): AnimeUpdateResponse
        createAnime(title: String, hero: String): [Anime]
    }

    ## subscription
    type Subscription {
        Anime: PostSubscriptionPayload!
    }

    ## 勉強: enumって何？
    ## 型タイプ
    enum MutationType {
        CREATED
        UPDATED
        DELETED
    }

    # subscriptionのフィールド
    type PostSubscriptionPayload {
        mutation: MutationType!
        data: [Anime]!
    }
`