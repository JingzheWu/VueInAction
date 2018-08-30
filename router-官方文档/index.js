let foo={
    template:`<div>this is foo</div>`
}
let bar={
    template:`<div>this is bar</div>`
}
let user={
    props:['id'],
    template:`
    <div>
        <h2>User {{id}}</h2>
        <router-link to="/user/154564/profile" tag="button">Go to user profile</router-link>
        <router-link to="/user/154564/posts" tag="button">Go to user posts</router-link>
        <router-view></router-view>
    </div>`
}
let userProfile={
    template:`
    <p>this is profile</p>
    `
}
let userPosts={
    template:`
    <p>this is posts</p>
    `
}
const routes=[
    {
        path:'/foo',
        component:foo
    },
    {
        path:'/bar',
        component:bar
    },
    {
        path:'/user/:id',
        component:user,
        props:true,
        children:[
            {
                path:'profile',
                component:userProfile
            },
            {
                path:'posts',
                component:userPosts
            }
        ]
    }
]
const router = new VueRouter({
    routes    
});
const app=new Vue({
    el:'#app-1',
    router,
    // template:`
    // <div>
    //     <h1>Hello App!</h1>
    //     <p>
    //         <router-link to="/foo">Go to Foo</router-link>
    //         <router-link to="/bar">Go to Bar</router-link>
    //     </p>
    //     <router-view></router-view>
    // </div>
    // `
})
// let cpt1={
//     props:['myProp'],
//     template:`
//     <ul>
//         <li>子组件</li>
//         <li>参数{{myProp}}</li>
//     </ul>
//     `
// }
// new Vue({
//     el:'#app-1',
//     components:{
//         cpt1
//     },
//     data:{
//         message:'hahaha'
//     },
//     // template:`
//     // <cpt1 :my-prop="message"></cpt1>
//     // `,
//     render:function(createElement){
//         return createElement(
//             cpt1,
//             {
//                 props:{
//                     myProp:this.message
//                 }
//             }
//         );
//     }
// });