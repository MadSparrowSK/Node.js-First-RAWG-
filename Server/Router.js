module.exports = class Router {
    constructor() {
        this.endpoints = {}
    }

    request(method, path, handler) {
        if(!this.endpoints[path]) {
            this.endpoints[path] = {}
        }
        const endpoint = this.endpoints[path];

        if(endpoint[method]) {
            throw new Error(`By this path ${path} handler already has`);
        }
        endpoint[method] = handler;
    }
    get(path, handler) {
        this.request('GET', path, handler)
    }
}