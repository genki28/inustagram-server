import { AnimeRepository } from './AnimeRepository'
import { Log4js, getLogger } from 'log4js'
const repo = new AnimeRepository()

const logger = getLogger()
logger.level = 'debug'

const books = [
    {
        title: 'The Awakening',
        author: 'Kate Chopin'
    },
    {
        title: 'City of Glass',
        author: 'Paul Auster'
    }
]

const animes = [
    {
        id: 1,
        title: 'とある魔術のINDEX',
        hero: '上条当麻'
    },
    {
        id: 2,
        title: '呪術廻戦',
        hero: '虎杖悠仁'
    }
]

export const resolvers = {
    Query: {
        books: () => books,
        animes: () => animes,
        anime: ({ id }: { id: number }) => {
            const anime = repo.getAnime(id)
            return anime ? anime : []
        }
        // animes: async (_, _, { dataSources }) =>
        //     await dataSources.animeAPI.getAllAnimes(),
        // anime: async()
    },

    Mutation: {
        createAnime(_: any, data: { title: string, hero: string }, { pubsub }: any, info: any) {
            // const animes = repo.getAnimes()
            // const animes = animes
            const id = animes.length + 1
            const anime = {
                id: id,
                title: data.title,
                hero: data.hero
            }

            // logger.debug('hello')
            // logger.debug(data)
            // logger.debug(data.title)
            // logger.debug(data.hero)
            animes.push(anime)
            // Animeで良い？post？
            pubsub.publish('anime', {
                Anime: {
                    mutation: 'CREATED',
                    data: animes
                }
            })
            return animes
        },

        updateAnime(_: any, data: {animeId: number, title: string, hero: string}, { pubsub }: any, info: any) {
            // logger.debug('test')
            const index = Number(data.animeId) - 1
            const updateData = {
                id: data.animeId,
                title: data.title,
                hero: data.hero
            }
            animes[index] = Object.assign(animes[index], updateData)

            pubsub.publish('anime', {
                Anime: {
                    mutation: 'UPDATED',
                    data: animes
                }
            })
            return {
                success: true,
                message: 'OK',
                anime: animes
            }
        },

        // 第二引数はargsで良いか
        deleteAnime(_: any, data: {animeId: number}, {pubsub}: any, info: any) {
            const index = Number(data.animeId) - 1
            animes.splice(index, 1)

            pubsub.publish('anime', {
                Anime: {
                    mutation: 'DELETED',
                    data: animes
                }
            })
            return {
                success: true,
                message: 'OK',
                anime: animes
            }
        }
    },
    
    Subscription: {
        Anime: {
            subscribe(parent: any, args: any, { pubsub }: any, info: any) {
                return pubsub.asyncIterator('anime')
            }
        }
    }
}