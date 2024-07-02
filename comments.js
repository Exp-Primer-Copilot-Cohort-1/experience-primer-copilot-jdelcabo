//Create web server
var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');

var comments = [];
var server = http.createServer(function(request, response){
    var url_parts = url.parse(request.url);
    if(url_parts.pathname === '/comment'){
        if(request.method === 'POST'){
            var body = '';
            request.on('data', function(data){
                body += data;
            });
            request.on('end', function(){
                var POST = qs.parse(body);
                comments.push(POST.comment);
                response.end('Comment added');
            });
        } else if(request.method === 'GET'){
            response.end(JSON.stringify(comments));
        }
    } else {
        fs.readFile('./index.html', function(error, data){
            response.end(data);
        });
    }
});

server.listen(3000);
console.log('Server is running on http://localhost:3000');
//Create client
var http = require('http');
var qs = require('querystring');

var options = {
    host: 'localhost',
    port: 3000,
};