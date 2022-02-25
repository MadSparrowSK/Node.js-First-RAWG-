const Router = require('../Router')

const request = require('./axios.request')
const makeGameList = require('./gamesList')

const errors = require('./errors')
const {regexpToText} = require("nodemon/lib/utils");

const router = new Router();

const test = {
    TEST: {
        MESSAGE: 'YOU ON TEST PAGE'
    }
}
const badRequest = {
    BAD_REQUEST: {
        MESSAGE: "BAD REQUEST, 404 NOT FOUND"
    }
}

let gamesList = {}
let game = {
    id:2
}

const url = 'https://api.rawg.io/api/games';

const reExp = new RegExp('[0-10]');

router.get('/games', async (req,res) => {
    const response = await request(`${url}`, req.paramsURL);
    if(!response) {
        res.send(errors['404'])
    } else {
        const data = await response.data;
        gamesList = makeGameList(data);
        res.send(gamesList);
    }
})
router.get('/test', (req,res) => {
    res.send(test)
})

module.exports = router;