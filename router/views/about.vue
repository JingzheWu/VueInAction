<template>
    <div>
        <div>关于</div>
        <button @click="toIndex">跳转到index页面</button>
    </div>
</template>
<script>
    export default {
        methods:{
            toIndex(){
                this.$router.push('/index');
            }
        }
    }
</script>
<style scoped>
    div{
        color:aquamarine;
        font-size: 50px;
    }
</style>

