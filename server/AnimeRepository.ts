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

const messages = [
    {
        id: 1,
        sendUser: 1,
        receiveUser: 2,
        message: 'こんにちは'
    },
    {
        id: 2,
        sendUser: 2,
        receiveUser: 1,
        message: 'hi!hi!'
    }
]

export class AnimeRepository {
    getAnimes() {
        return animes
    }

    getAnime(id: number) {
        const anime = animes.filter((item) => {
            return id === item.id
        })
        return anime
    }

    getMessage(id: number) {
        const message = messages.filter((item) => {
            return id === item.id
        })
        return message
    }
}