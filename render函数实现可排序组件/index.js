Vue.component('v-table', {
    props:{
        columns:{
            type:Array,
            default:function(){
                return [];
            }
        },
        data:{
            type:Array,
            default:function(){
                return [];
            }
        }
    },
    data(){
        return {
            currentColumns:[],
            currentData:[]
        }
    },
    methods:{
        makeCurrentColumns(){
            this.currentColumns=this.columns.map(function(item,index){
                item._index=index;
                item._sortType='normal';
                return item;
            });
        },
        makeCurrentData(){
            this.currentData=this.data.map(function(item,index){
                item._index=index;
                return item;
            });
        },
        sortByAsc(index){
            let key=this.currentColumns[index].key;
            this.currentColumns.forEach(function(col){
                col._sortType='normal';
            });
            this.currentColumns[index]._sortType='asc';

            this.currentData.sort(function(a,b){
                if(a[key]>b[key]){
                    return 1;
                }else{
                    return -1;
                }
            });
        },
        sortByDesc(index){
            let key=this.currentColumns[index].key;
            this.currentColumns.forEach(function(col){
                col._sortType='normal';
            });
            this.currentColumns[index]._sortType='desc';

            this.currentData.sort(function(a,b){
                if(a[key]<b[key]){
                    return 1;
                }else{
                    return -1;
                }
            });
        }
    },
    mounted() {
        this.makeCurrentColumns();
        this.makeCurrentData();
    },
    render(create){
        let _this=this;
        //存放th的vNodes的数组
        let ths=[];
        //存放tr的vNode的二维数组
        let trs=[];
        
        this.currentData.forEach(function(row){
            //存放td的vNodes的数组
            let tds=[];
            _this.currentColumns.forEach(function(col){
                tds.push(create('td',row[col.key]));
            });
            trs.push(create('tr',tds));
        });

        this.currentColumns.forEach(function(col,index){
            if(col.sortable){
                ths.push(create(
                    'th',
                    [
                        create(
                            'span',
                            col.title
                        ),
                        create(
                            'a',
                            {
                                class:{
                                    on:col._sortType==='asc'
                                },
                                on:{
                                    'click':function(){
                                        _this.sortByAsc(index);
                                    }
                                }
                            },
                            '↑'
                        ),
                        create(
                            'a',
                            {
                                class:{
                                    on:col._sortType==='desc'
                                },
                                on:{
                                    'click':function(){
                                        _this.sortByDesc(index);
                                    }
                                }
                            },
                            '↓'
                        )
                    ]
                ));
            }else{
                ths.push(create('th',col.title));
            }
        });

        return create(
            'table',
            [
                create(
                    'thead',
                    [
                        create('tr',ths)
                    ]
                ),
                create(
                    'tbody',
                    trs
                )
            ]
        );
    }
});
new Vue({
    el:'#app-1',
    data:{
        columns:[
            {
                title:'姓名',
                key:'name'
            },
            {
                title:'年龄',
                key:'age',
                sortable:true
            },
            {
                title:'住址',
                key:'address'
            }
        ],
        data:[
            {
                name:'张三',
                age:18,
                address:'上海'
            },
            {
                name:'李四',
                age:21,
                address:'北京'
            },
            {
                name:'王五',
                age:20,
                address:'深圳'
            }
        ]
    }
});