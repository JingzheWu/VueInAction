Vue.component('input-number', {
    model:{
        prop:'num',
        event:'my-event'
    },
    props:{
        num:{
            type:Number,
            default:0
        },
        max:{
            type:Number,
            default:Infinity
        },
        min:{
            type:Number,
            default:-Infinity
        }
    },
    data:function(){
        return{
            currentVal:this.num
        }
    },
    methods:{
        isValueNumber:function(val){
            return (/(^-?[0-9]+\.{1}\d+$)|(^-?[1-9][0-9]*$)|(^-?0{1}$)/).test(val+"");
        },
        handleChange:function(event){
            let val=event.target.value.trim(),
                max=this.max,
                min=this.min;
            if(this.isValueNumber(val)){
                val=Number(val);
                this.currentVal=val;
                if(val>max){
                    this.currentVal=max;
                }else if(val<min){
                    this.currentVal=min;
                }
            }else{
                event.target.value=this.currentVal;
            }
        },
        updateValue:function(val){
            if(val>this.max){
                val=this.max;
            }
            if(val<this.min){
                val=this.min;
            }
            this.currentVal=val;
        },
        handleDown(val){
            if(this.currentVal<=this.min){
                return;
            }
            this.currentVal--;
        },
        handleUp(val){
            if(this.currentVal>=this.max){
                return;
            }
            this.currentVal++;
        }
    },
    mounted() {
        this.updateValue(this.num);
    },
    watch:{
        num:function(val){
            this.updateValue(val);
        },
        currentVal:function(val){
            this.$emit("my-event",val);
        }
    },
    template:`
    <div>
        <p>num: {{num}}</p>
        <p>currentVal: {{currentVal}}</p>
        <input type="text" :value="currentVal" @input="handleChange($event)">
        <button
            @click="handleDown"
            :disabled="currentVal<=min">-</button>
        <button
            @click="handleUp"
            :disabled="currentVal>=max">+</button>
    </div>
    `
});
let vm=new Vue({
    el:'#app-1',
    data:{
        value:5
    }
});