import { AnimeRepository } from './AnimeRepository'
const repo = new AnimeRepository()

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
        createAnime(title: string) {
            const animes = repo.getAnimes()
            const id = animes.length + 2
            animes.push({
                id: id, 
                title: title 
            })
            return animes
        }
    }
}