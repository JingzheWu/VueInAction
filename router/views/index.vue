<template>
    <div>
        <div>首页</div>
        <div>Hello {{name}}</div>
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
        methods:{
            handleClick(e){
                console.log(e);
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

