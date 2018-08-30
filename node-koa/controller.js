const fs=require('fs');

function addMapping(router,mapping){

}

function addControlors(router,dir){
    let files=fs.readdirSync(__dirname+'/'+dir);
    let js_files=files.filter((f)=>{
        return f.endsWith('.js');
    })
    for (const f of js_files) {
        console.log(`process controller: ${f}...`);
        let mapping=require(__dirname+'/'+dir+'/'+f);
        addMapping(router,mapping);
    }
}