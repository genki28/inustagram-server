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
        title: '祭日',
        hero: '上条当麻'
    }
]

export class AnimeRepository {
    AllBooks() {
        return books
    }

    getAnimes() {
        return animes
    }

    getAnime(id: number) {
        const anime = animes.filter((item) => {
            return id === item.id
        })
        return anime
    }
}