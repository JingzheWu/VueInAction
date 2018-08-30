import {mapState, mapActions} from 'vuex';

const Counter={
    computed:mapState({
        myCount(){
            return this.$store.state.count;
        },
        myCountAlias:'count'//别名应该是state中的属性名，而不是myCount
    }),
    methods:{
        addCount(){
            this.$store.commit("increament");
        },
        reduceCount(){
            this.$store.commit("decreament",2);
        },
        ...mapActions({
            actionIncreament:'increament'
        })
    },
    template:`
    <div>
        <p>myCount: {{myCount}}</p>
        <p>myCountAlias: {{myCountAlias}}</p>
        <button @click="addCount">add count</button>
        <button @click="reduceCount">reduce count</button>
        <button @click="actionIncreament(3)">add action count</button>
    </div>
    `
}
export default Counter;