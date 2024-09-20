import { Observable } from "rxjs"


export const timedResult=(fn:Function, delay:number)=>{

    return new Observable( (subscriber:any)=>{

        const iid=setInterval(()=>{

            try{

                const result = fn();
                if(result===undefined){
                    //complete
                    subscriber.complete();
                    clearInterval(iid);
                    return;
                }
                
                //next
                subscriber.next(result);
        
            }catch(e){
                //errror
                subscriber.error(e)
            }
    
    

        }, delay);

        
    })

}