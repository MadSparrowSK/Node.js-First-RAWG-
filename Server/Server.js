const http = require('http');
const EventEmitter = require('events');

const errors = require('./src/errors')
const request = require('./src/axios.request.js')

const {Game} = require('./src/gamesList')

module.exports = class Server {
    constructor() {
        this.server = this._createServer();
        this.emitter = new EventEmitter();
        this.middlewares = [];

        this.regExpt = `/games/${/\d/}`;
        this.dynamicRoutes = []
    }

    use(middleware) {
        this.middlewares.push(middleware);
    }

    addRouter(router) {
        Object.keys(router.endpoints).forEach(path => {
            const endpoint = router.endpoints[path];
            Object.keys(endpoint).forEach(method => {
                const handler = endpoint[method];
                this.emitter.on(this._getRouteMask(path, method), (req, res) => {
                    console.log(`[${path}]:[${method}]`)
                    handler(req,res);
                })
            })
        })
    }

    getIdFromURL(url) {
        const id = url.substring(url.lastIndexOf('/') + 1);
        return id;
    }
    addDynamicRoute(method,path) {
        this.emitter.on(this._getRouteMask(path, method), async (req, res) => {
            const id = this.getIdFromURL(req.url)
            const respond = await request(`https://api.rawg.io/api/games/${id}`);
            if(!respond) {
                res.send(errors['404'])
            } else {
                const data =  await respond.data;
                const game = Game(data);
                res.send(game)
            }

        })
    }

    _createServer() {
        return http.createServer((req, res) => {
            if(req.url.match(/\d/) && !this.dynamicRoutes.includes(req.url)) {
                this.dynamicRoutes.push(req.url)
                this.addDynamicRoute('GET', req.url)
            }
            this.middlewares.forEach(middleware => middleware(req,res))
            const emitted = this.emitter.emit(this._getRouteMask(req.pathname, req.method), req ,res);
            if(!emitted) {
                res.send(errors['404'])
            }
        })
    }
    _getRouteMask(path, method) {
        return `[${path}]:[${method}]`;
    }

    listen(port, callback) {
        this.server.listen(port, callback);
    }
}