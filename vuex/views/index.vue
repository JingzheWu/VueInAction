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
        <router-link to="/about" tag="button">跳转到about页面</router-link>
    </div>
</template>
<script>
    import vTitle from '../title.vue';
    import vButton from '../button.vue';

    export default {
        components:{
            'v-title':vTitle,
            'v-button':vButton
        },
        data:function(){
            return {
                name:'Vue.js'
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
            }
        }
    }
</script>
<style scoped>
    div{
        color: yellow;
        font-size: 30px;
    }
</style>

