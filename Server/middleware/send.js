module.exports = sendData = (req,res) => {
    res.send = (data) => {
        res.writeHead(200, {
            "Access-Control-Allow-Origin": '*',
            'Content-Type':'application/json'
        })
        res.end(JSON.stringify(data));
    }
}