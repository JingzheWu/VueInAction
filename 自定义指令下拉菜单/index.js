Vue.directive('click-outside', {
    bind:function(el,binding,vNode){
        function documentHandler(event){
            if(el.contains(event.target)){
                return false;
            }
            if(binding.expression){
                binding.value(event);
            }
        }
        el.__vueClickOutside__=documentHandler;
        document.addEventListener("click",documentHandler);
    },
    unbind:function(el,binding,vNode){
        document.removeEventListener("click",el.__vueClickOutside__);
        delete el.__vueClickOutside__;
    }
});
let vm=new Vue({
    el:'#app-1',
    data:{
        show:false
    },
    methods:{
        handleClick(){
            this.show=false;
        }
    }
})