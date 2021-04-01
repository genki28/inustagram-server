import { gql } from 'apollo-server'

export const typeDefs = gql`
    ## query
    # type User {
    #     id: ID
    #     name: String
    # }

    type Message {
        id: ID
        sendUser: Int
        receiveUser: Int
        message: String
    }

    type Anime {
        id: ID
        title: String
        hero: String
    }

    type Query {
        message(id: ID!): Message
        messages: [Message]
        animes: [Anime]
        anime(id: ID!): Anime
    }

    ## mutation
    type SendMessageResponse {
        success: Boolean!
        responseMessage: String
        data: [Message]
    }

    type AnimeUpdateResponse{
        success: Boolean!
        message: String
        anime: [Anime]
    }

    type Mutation {
        createMessage(message: String, sendUser: Int, receiveUser: Int): SendMessageResponse
        deleteMessage(messageId: ID!): SendMessageResponse
        
        deleteAnime(animeId: ID!): AnimeUpdateResponse
        updateAnime(animeId: ID!, title: String, hero: String): AnimeUpdateResponse
        createAnime(title: String, hero: String): [Anime]
    }

    ## subscription
    type Subscription {
        Message: MessageSubscription!
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
    type MessageSubscription {
        mutation: MutationType!
        data: [Message]
    }

    type PostSubscriptionPayload {
        mutation: MutationType!
        data: [Anime]!
    }
`