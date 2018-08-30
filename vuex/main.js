import Vue from 'vue';
import App from './app.vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';

Vue.use(VueRouter);
Vue.use(Vuex);

const Routers=[
    {
        path:'/index',
        meta:{
            title:'首页'
        },
        //下面这种写法是异步路由，按需加载，或者称为懒加载
        component:(resolve)=>require(['./views/index.vue'],resolve)
        //下面这种写法是同步路由，即在打开首页时把所有文件都加载进来、
        // component:require('./views/index.vue')

    },
    {
        path:'/about',
        meta:{
            title:'关于'
        },
        component:(resolve)=>require(['./views/about.vue'],resolve)
    },
    {
        path:'/user/:id',
        meta:{
            title:'个人主页'
        },
        component:(resolve)=>require(['./views/user.vue'],resolve)
    },
    {
        path:'*',
        redirect:'/index'
    }
];
const router = new VueRouter({
    //使用HTML5的History模式
    mode:'history',
    routes:Routers   
});

const store=new Vuex.Store({
    state:{
        count:0,
        list:[1,5,8,11,20,23]
    },
    mutations:{
        increment(state,n=1){
            state.count+=n;
        },
        decrease(state,n=1){
            state.count-=n;
        }
    },
    getters:{
        filterList(state){
            return state.list.filter(item=>item<10);
        }
    }
});


router.beforeEach(function(to,from,next){
    window.document.title=to.meta.title;
    next();
});
router.afterEach((to,from,next)=>{
    window.scrollTo(0,0);
});

new Vue({
    el:'#app',
    router:router,
    store:store,
    render:h=>h(App)
});