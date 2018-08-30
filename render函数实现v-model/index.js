Vue.component('ele', {
    props:['value'],
    render:function(createElement){
        let _this=this;
        return createElement("div",
            [
                createElement("input",
                    {
                        domProps:{
                            value:this.value
                        },
                        on:{
                            input:function(){
                                _this.$emit("input",event.target.value);
                            }
                        }
                    }
                )
            ]
        );
    }
});
let app1=new Vue({
    el:'#app-1',
    data:{
        value:""
    }
});