Vue.component('tabs', {
    props:{
        value:{
            type:[String,Number]
        }
    },
    data(){
        return {
            currentValue:this.value,
            //用于渲染tabs的标题
            navList:[]
        }
    },
    methods:{
        tabCls(item){
            return [
                'tabs-tab',
                {
                    //给当前选中的tab加一个class
                    'tabs-tab-active':item.name===this.currentValue
                }
            ]
        },
        //点击tab标题时触发
        handleChange(index){
            let nav=this.navList[index];
            let name=nav.name;
            this.currentValue=name;
            this.$emit('input',name);
            this.$emit('on-click',name);
        },
        getTabs(){
            //遍历子组件，得到所有的pane组件
            return this.$children.filter((item)=>{
                return item.$options.name==='pane';
            });
        },
        updateNav(){
            this.navList=[];
            this.getTabs().forEach((pane,index) => {
                this.navList.push({
                    label:pane.label,
                    name:pane.name||index
                });
                //如果没有给pane设置name，那么默认设置它的索引
                if(!pane.name){
                    pane.name=index;
                }
                //设置当前选中项的tab的索引
                if(index===0){
                    if(!this.currentValue){
                        this.currentValue=pane.name||index;
                    }
                }
            });
            this.updateStatus();
        },
        updateStatus(){
            let tabs=this.getTabs();
            tabs.forEach((tab)=>{
                return tab.show=tab.name===this.currentValue;
            });
        }
    },
    watch:{
        value(val){
            this.currentValue=val;
        },
        currentValue(val){
            this.updateStatus();
        }
    },
    template:`
    <div class="tabs">
        <div class="tabs-bar">
            <div
                :class="tabCls(item)"
                v-for="(item,index) in navList"
                @click="handleChange(index)">
                {{item.label}}
            </div>
        </div>
        <div class="tabs-content">
            <!--这里的slot就是嵌套的pane-->
            <slot></slot>
        </div>
    </div>    
    `
});

Vue.component('pane', {
    name:'pane',
    props:{
        name:{
            type:String
        },
        label:{
            type:String,
            default:''
        }
    },
    data(){
        return {
            show:true
        }
    },
    methods:{
        updateNav(){
            this.$parent.updateNav();
        }
    },
    watch:{
        label(){
            this.updateNav();
        }
    },
    mounted() {
        this.updateNav();
    },
    template:`
    <div class="pane" v-show="show">
        <slot></slot>
    </div>
    `
});

new Vue({
    el:'#app-1',
    data:{
        activeKey:"1"
    }
});