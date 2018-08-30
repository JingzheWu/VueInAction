let ImgItem={
    props:['data'],
    render:function(createElement){
        return createElement(
            'div',
            [
                createElement('p','图片组件'),
                createElement('img',
                    {
                        attrs:{
                            src:this.data.url
                        }
                    }
                )
            ]
        );
    }
};
let VideoItem={
    props:['data'],
    render:function(createElement){
        return createElement(
            'div',
            [
                createElement('p','视频组件'),
                createElement('video',
                    {
                        attrs:{
                            src:this.data.url,
                            controls:'controls',
                            autoplay:'autoplay'
                        }
                    }
                )
            ]
        );
    }
};
let TextItem={
    props:['data'],
    render:function(createElement){
        return createElement(
            'div',
            [
                createElement('p','文本组件'),
                createElement('p',this.data.text)
            ]
        );
    }
};
Vue.component('smart-item', {
    props:{
        data:{
            type:Object,
            required:true
        }
    },
    functional:true,
    render:function(createElement,context){
        function getItem(){    
            if(context.props.data.type==='img')return ImgItem;
            if(context.props.data.type==='video')return VideoItem;
            if(context.props.data.type==='text')return TextItem;
        }
        return createElement(
            getItem(),
            {
                props:{
                    data:context.props.data
                }
            }
        );
    }
})
new Vue({
    el:'#app-1',
    data:{
        data:{}
    },
    methods:{
        change(type){
            if(type==="img"){
                this.data={
                    type:"img",
                    url:"https://raw.githubusercontent.com/iview/iview/master/assets/logo.png"
                }
            }else if(type==="video"){
                this.data={
                    type:"video",
                    url:"http://vjs.zencdn.net/v/oceans.mp4"
                }
            }else if(type==="text"){
                this.data={
                    type:"text",
                    text:"一段文本"
                }
            }
        }
    },
    created() {
        this.change('img');
    },
})