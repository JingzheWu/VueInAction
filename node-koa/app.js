const Koa=require('koa');
const fn_router=require('koa-router');
const bodyParser=require('koa-bodyparser');

let app=new Koa();
let router=fn_router();

app.use(async (ctx,next)=>{
    await next();
    console.log(ctx.request.method,ctx.request.url);
});

// router.get('/hello/:name',async (ctx,next)=>{
//     let name=ctx.params.name;
//     ctx.response.body=`<p>Hello, ${name}!</p>`;
// })
// router.get('/',async (ctx,next)=>{
//     ctx.response.body = `<h1>Index</h1>
//     <form action="/signin" method="post">
//         <p>Name: <input name="name" value="koa"></p>
//         <p>Password: <input name="password" type="password"></p>
//         <p><input type="submit" value="Submit"></p>
//     </form>`;
// })
// router.post('/signin',(ctx,next)=>{
//     let name=ctx.request.body.name||'',
//         password=ctx.request.body.password|'';
//     if (name==='koa'&&password===123456) {
//         ctx.response.body=`<p>Hello, ${name}!</p>`;
//     }else{
//         ctx.response.body = `<h1>Login failed!</h1>
//         <p><a href="/">Try again</a></p>`;
//     }
// })

// app.use(bodyParser());
// app.use(router.routes());
// app.listen(3000);
// console.log('app started at port 3000...');