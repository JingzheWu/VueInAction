<template>
    <div>
        <div>首页</div>
        <div>Hello {{name}}</div>
        <hr>
        <div>
            {{count}}
            <button @click="handleIncrement">+</button>
            <button @click="handleDecrease">-</button>
        </div>
        <hr>
        <div>{{list}}</div>
        <v-title title="Vue组件化"></v-title>
        <v-button @click="handleClick">点击按钮</v-button>
        <div>
            <img src="../images/image.png" alt="无法显示" style="width:200px;">
        </div>
        <v-counter :number="number"></v-counter>
        <router-link to="/about" tag="button">跳转到about页面</router-link>
    </div>
</template>
<script>
    import vTitle from '../title.vue';
    import vButton from '../button.vue';
    import vCounter from './counter.vue';

    export default {
        components:{
            'v-title':vTitle,
            'v-button':vButton,
            'v-counter':vCounter
        },
        data:function(){
            return {
                name:'Vue.js',
                number:0
            }
        },
        computed:{
            count(){
                return this.$store.state.count;
            },
            list(){
                return this.$store.getters.filterList;
            }
        },
        methods:{
            handleClick(e){
                console.log(e);
            },
            handleIncrement(){
                this.$store.commit('increment',5);
            },
            handleDecrease(){
                this.$store.commit('decrease',2);
            },
            handleRandom(num){
                this.number+=num;
            }
        },
        created(){
            this.$bus.on('add-random',this.handleRandom);
        },
        beforeDestroy(){
            this.$bus.off('add-random',this.handleRandom);
        }
    }
</script>
<style scoped>
    div{
        color: yellow;
        font-size: 30px;
    }
</style>