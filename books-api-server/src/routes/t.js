class X{
    constructor(y,z){

    }
}



function Y(a,b){
    this.a=a;
    this.b=b;
}

function extractParameters(str,index){
    let index2=str.indexOf("(",index);
    var index3=str.indexOf(")", index2);
    return str.substring(index2+1,index3).split(",")
}

function checkSignature(fn){
    //console.log(fn.toString());
    let str= fn.toString();
    let result=null;
    if(str.startsWith("class")){
        let index=str.indexOf("constructor");
        result=extractParameters(str,index);
    }else if(str.startsWith("function")){
        result=extractParameters(str,0);

    }else if(str.startsWith("(")){
        result=extractParameters(str,0);
    }

   console.log(result);
}

checkSignature(X);
checkSignature(Y);
checkSignature((a,b)=>X);