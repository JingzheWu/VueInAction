<template>
    <div>
        <div>Hello {{name}}</div>
        <v-title title="Vue组件化"></v-title>
        <v-button @click="handleClick">点击按钮</v-button>
        <div>
            <img src="./images/image.png" alt="无法显示" style="width:200px;">
        </div>
    </div>
</template>
<script>
    import vTitle from './title.vue';
    import vButton from './button.vue';

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
        color: blue;
        font-size: 24px;
    }
</style>

