

//what are we going to add in ths container
/*
    this.container={
    
        //key is interface, 
        // constructor parameter includes constructor/class
        //scope : singleton/transient
        //   singleton: one copy shared everywhere
        //   transient : each time we need it we create it.
        authorRepository: {constructor:MongooseAuthorRepository, scope:'singleton', hasConstructor:true },
        
        //here we use a factory (isConstructor:false) to create object rather than constructor
        //default scope can be transient.
        bookRepository: {factory:createBookRepository, hasConstructor:false },


        //we may also store normal values like dburl
        DBURL: 'mongodb://localhost',
    }

*/


class Injector{
    
    constructor(){
        this.container={};
    }

    register=(key,constructor, scope='transient')=>{
        this.container[key]={constructor,scope,hasConstructor:true};
        return this;
    }

    registerFactory=(key,factory,scope='transient')=>{
        this.container[key]={factory,scope,hasConstructor:false};
        return this;
    }

    registerObject=(key, object)=>{
        this.container[key]={scrope:'singleton',instance:object};
        return this;
    }


    _lookup(key){
        var metaInfo=this.container[key];
        if(!metaInfo)
            throw new Error(`No registered ${key} in the container`);

        if(metaInfo.constructor){
            return new metaInfo.constructor();
        }else{
            return metaInfo.factory();
        }
    }

    lookup=(key)=>{
        if(!key)
            return undefined;

        console.log(`looking up for ${key}`)
        var metaInfo = this.container[key];
        if(!metaInfo)
            throw new Error(`No registered '${key}' in the container`);

        var object=metaInfo.instance?? this._createObject(metaInfo);
        if(metaInfo.scope==='singleton' && !metaInfo.instance)
            metaInfo.instance=object;
        
        console.log(`return  for ${key}: ${JSON.stringify(object)}`);
        return object;
    }

    _createObject=(metaInfo)=>{
        //var fn = metaInfo.hasConstructor ? metaInfo.constructor : metaInfo.factory;

        var fn = metaInfo.constructor ?? metaInfo.factory; //class AuthorController{ constructor(authorService){}}

        var dependencyKeys = this._getDependencies(fn); // [authorService]
        var dependencyValues =[];

        console.log(`dependencyKeys for ${fn.name} is ${dependencyKeys}`);
        
        for(let key of dependencyKeys){
           
            var value = this.lookup(key); //this.lookup('authorService');
            if(value!==undefined){
                console.log(`found ${value.constructor.name}`);
                dependencyValues.push(value);
            }
        }

        if(metaInfo.hasConstructor){
            console.log('creating', metaInfo.constructor.name, 'with', dependencyValues.map(v=>v.constructor.name));
            return new fn(...dependencyValues); //new fn( mongooseBookRepository, authorService)
        }
        else{
            console.log('using factory', metaInfo.factory.name, 'with', dependencyValues.map(v=>v.constructor.name));
            return metaInfo.factory(...dependencyValues);
        }
    }


    _extractParameters(str,index){
        let index2=str.indexOf("(",index);
        var index3=str.indexOf(")", index2);
        return str.substring(index2+1,index3).split(",").map(key=>key.trim());
    }
    
    _getDependencies(fn){
        //console.log(fn.toString());
        let str= fn.toString();
        const extractParameters = this._extractParameters;
        let result=null;
        if(str.startsWith("class")){
            let index=str.indexOf("constructor");
            result=extractParameters(str,index);
        }else if(str.startsWith("function")){
            result=extractParameters(str,0);
    
        }else if(str.startsWith("(")){
            result=extractParameters(str,0);
        }
    
       return result;
    }

}


module.exports={injector: new Injector()};