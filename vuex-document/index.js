import Vue from 'vue';
import Vuex from 'vuex';
import counterCpt from './counter';
import createLogger from 'vuex/dist/logger';

Vue.use(Vuex);

const logger=createLogger(/*{
    collapsed: false, // 自动展开记录的 mutation
    logger: console, // 自定义 console 实现，默认为 `console`
}*/);

const moduleA={
    namespaced:true,
    state:{
        countA:0
    },
    getters:{
        getterA(state){
            return state.countA+"asd";
        }
    },
    mutations:{
        increamentA(state,n=1){
            state.countA+=n;
        }
    }
}

const store = new Vuex.Store({
    strict:true,
    modules:{
        a:moduleA
    },
    state:{
        count:0,
        todos:[
            {id:1,done:false},
            {id:2,done:true}
        ]
    },
    getters:{
        doneTodos(state){
            return state.todos.filter(todo=>todo.done);
        },
        getTodosById(state){
            return function(id){
                return state.todos.find(todo=>todo.id===id);
            }
        }
    },
    mutations:{
        increament(state,n=1){
            state.count+=n;
        },
        decreament(state,n){
            state.count-=n;
        }
    },
    actions:{
        increament({commit},n){
            setTimeout(()=>{
                commit('increament',n);
            },1000);
        }
    },
    plugins:[logger]
});

new Vue({
    el:'#app',
    store,
    data:{
        message:'this is a title'
    },
    components:{
        counterCpt
    },
    methods:{
        addCountA(){
            this.$store.commit('a/increamentA');
        },
        funcA(){
            // this.$store.state.count++;
        }
    },
    template:`
    <div>
        <p>{{message}}</p>
        <counter-cpt></counter-cpt>
        <p>doneTodos: {{this.$store.getters.doneTodos}}</p>
        <p>getTodosById: {{this.$store.getters.getTodosById(2)}}</p>
        <p><pre>{{this.$store.state}}</pre></p>
        <hr>
        <p><pre>{{this.$store.getters}}</pre></p>
        <hr>
        <p>{{this.$store.state.a.countA}} <button @click="addCountA">click</button></p>
        <hr>
        <button @click="funcA">call funcA</button>
    </div>
    `
})