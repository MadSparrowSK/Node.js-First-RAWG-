module.exports = (baseUrl) => (req,res) => {
    const url = new URL(req.url, baseUrl);
    const params = {};
    let paramsUrl = "";
    url.searchParams.forEach(((value, key) => {
        params[key] = value;
        paramsUrl += `${key}=${value}&`
    }))

    req.pathname = url.pathname;
    req.params = params;
    req.paramsURL = paramsUrl;
}