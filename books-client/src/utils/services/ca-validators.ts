import { AbstractControl, ValidationErrors } from "@angular/forms";


export const noSpaces= (control:AbstractControl)=>{

    const value = control.value;
    if(!value)
        return null; //for me it is not invalid.

    if(value.toString().includes(' '))
        return {noSpaces:"Shouldn't contain spaces"}; //validation failed


    return null; //validation passed.    

}

export const lowerCase = (control:AbstractControl)=>{
    var value = control.value;
    if(!value) return null;

    const str= value.toString();

    if(str!== str.toLowerCase()){
        return {lowerCase:"The text should be all lower case"};
    }else{
        return null;
    }

}

