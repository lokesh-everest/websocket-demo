let http = require('http');
let url = require('url');
let static = require('node-static');

let fileServer = new static.Server('.');

let messages = [];

function accept(req, res) {
    let urlParsed = url.parse(req.url, true);

    if (urlParsed.pathname == '/receive' && req.method == 'GET') {
        res.end(JSON.stringify(messages))
        return;
    }

    if (urlParsed.pathname == '/publish' && req.method == 'POST') {
        // accept POST
        req.setEncoding('utf8');
        let message = '';
        req.on('data', function (chunk) {
            message += chunk;
        }).on('end', function () {
            messages.push(message)
            res.end("ok");
        });

        return;
    }

    // the rest is static
    fileServer.serve(req, res);

}


http.createServer(accept).listen(8080);
console.log('Server running on port 8080');