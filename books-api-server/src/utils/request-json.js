

module.exports=(req, res, next)=>{

    let data='';

    req
        .on('data',(chunk)=> data+=chunk.toString())
        .on('end',()=>{
            req.json=JSON.parse(data);
            next();
        });
}