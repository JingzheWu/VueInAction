let http=require('http');
let server=http.createServer(function(request,response){
    console.log(request.method+": "+request.url);
    // 将http响应200写入response，同时设置http头
    response.writeHead(200,{
        'Content-Type':'text/html',
        'anotherHead':'aaaaa'
    });
    // 将HTTP响应的内容写入response
    response.end('<p>hello world</p>');
});
server.listen(8080);
console.log('Server is running at http://127.0.0.1:8080');