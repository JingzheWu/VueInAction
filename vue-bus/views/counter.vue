<template>
    <div>
        {{number}}
        <button @click="handleRandom">随机增加</button>
    </div>
</template>
<script>
    export default {
        props:{
            number:{
                type:Number
            }
        },
        methods:{
            handleRandom(){
                let num=Math.floor(Math.random()*100+1);
                this.$bus.emit('add-random',num);
            }
        }
    }
</script>
