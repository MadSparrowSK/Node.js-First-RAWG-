module.exports = makeGameList = (data) => {
    const gameList = {};

    gameList['count'] = data['count']
    gameList['next'] = data['next'];
    gameList['previous'] = data['previous'];
    gameList['results'] = data['results'];

    return gameList;
}