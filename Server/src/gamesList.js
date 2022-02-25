const makeGameList = (data) => {
    const gameList = {};

    gameList['count'] = data['count']
    gameList['next'] = data['next'];
    gameList['previous'] = data['previous'];
    gameList['results'] = data['results'];

    return gameList;
}

const Game = (data) => {
    const game = {}

    game['id'] = data['id'];
    game['name'] = data['name_original'];
    game['alternative_names'] = data['alternative_names'];
    game['description'] = data['description'];
    game['background_image'] = data['background_image'];
    game['website'] = data['website'];
    game['metacritic'] = data['metacritic'];
    game['metacritic_url'] = data['metacritic_url'];
    game['metacritic_platforms'] = data['metacritic_platforms']
    game['platforms'] = data['platforms'];
    game['stores'] = data['stores'];
    game['genres'] = data['genres'];
    game['tags'] = data['tags'];
    game['developers'] = data['developers'];
    game['publishers'] = data['publishers'];

    return game;
}

module.exports = {
    makeGameList,
    Game
}