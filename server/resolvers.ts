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
        createAnime(_: any, data: { title: string, hero: string }) {
            // const animes = repo.getAnimes()
            // const animes = animes
            const id = animes.length + 1

            // logger.debug('hello')
            // logger.debug(data)
            // logger.debug(data.title)
            // logger.debug(data.hero)
            animes.push({
                id: id,
                title: data.title,
                hero: data.hero
            })
            return animes
        },

        updateAnime(_: any, data: {animeId: number, title: string, hero: string}) {
            // logger.debug('test')
            const index = Number(data.animeId) - 1
            const updateData = {
                id: data.animeId,
                title: data.title,
                hero: data.hero
            }
            animes[index] = Object.assign(animes[index], updateData)
            return {
                success: true,
                message: 'OK',
                anime: animes
            }
        },

        deleteAnime(_: any, data: {animeId: number}) {
            const index = Number(data.animeId) - 1
            animes.splice(index, 1)
            // logger.debug(animes)
            return {
                success: true,
                message: 'OK',
                anime: animes
            }
        }
    }
}