// Vue劫持DOM中的节点进行编译
function nodeToFragment(node,vm){
    let myDom,child;
    myDom = document.createDocumentFragment();
    while(child = node.firstChild){
        compile(child,vm);
        myDom.appendChild(child);
    }
    return myDom;
}

// HTML模板编译函数
function compile(node,vm){
    let mustacheReg = /\{\{(.*)\}\}/;
    //node是element
    if(node.nodeType===1){
        let attrs = node.attributes;
        //遍历解析属性
        for(let i = 0; i < attrs.length; i++){
            if(attrs[i].nodeName==='v-model'){
                // 将Vue实例中的对应属性赋值给element
                let name = attrs[i].nodeValue;
                new Watcher(vm,node,name);
                node.addEventListener('input',function(e){
                    vm[name] = e.target.value;
                });
            }
        }
    }else if(node.nodeType===3){
        //node是文本节点
        if(mustacheReg.test(node.nodeValue)){
            let name = RegExp.$1;
            name=name.trim();
            new Watcher(vm,node,name);
        }
    }
}

// 订阅者watcher订阅的主题对象
function Dep(){
    this.subs=[];
}
Dep.prototype.addSub = function(sub){
    this.subs.push(sub);
}
Dep.prototype.notify = function(){
    this.subs.forEach(function(sub){
        sub.update();
    })
}

// 订阅者，订阅Vue实例中的data属性
function Watcher(vm,node,name){
    Dep.target = this;
    this.vm =vm;
    this.node = node;
    this.name = name;
    this.update();
    Dep.target=  null;
}
Watcher.prototype.update = function(){
    this.get();
    if(this.node.nodeType===1){
        this.node.value = this.value;
    }else if(this.node.nodeType===3){
        this.node.nodeValue = this.value;
    }
}
Watcher.prototype.get = function(){
    // 在这里会触发Vue实例属性的get
    this.value = this.vm[this.name];
}

// Vue实例劫持data中的属性，变成自己的属性，并转化为getter/setter
function defineReactive(vm,key,val){

    let dep = new Dep();

    // 将data中的属性添加到Vue实例中
    Object.defineProperty(vm,key,{
        get:function(){
            if(Dep.target){
                dep.addSub(Dep.target);
            }
            return val;
        },
        set:function(newVal){
            if(newVal===val){
                return;
            }else{
                val=newVal;
                // 通知变化
                dep.notify();
            }
        }
    });
}
function observe(data,vm){
    Object.keys(data).forEach(function(key){
        defineReactive(vm,key,data[key]);
    });
}

// Vue的构造函数
function Vue(options){
    this.data = options.data;
    let data=this.data;
    // 劫持数据并转化为getter/setter
    observe(data,this);

    let id = options.el.match(/#(.+)/)[1];
    // Vue实例劫持DOM中节点进行编译
    let dom = nodeToFragment(document.getElementById(id),this);
    // 编译之后再将放回到DOM中
    document.getElementById(id).appendChild(dom);
}

let vm = new Vue({
    el:'#app',
    data:{
        message:"this is a message"
    }
})