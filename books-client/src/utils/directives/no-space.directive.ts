import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { noSpaces } from '../services/ca-validators';

@Directive({
  selector: '[no-space]',
  providers: [
    { 
      provide: NG_VALIDATORS, 
      useExisting: NoSpaceDirective, 
      multi: true
    }
  ]  // multi: true for multiple validators on the same control. This allows to use multiple noSpaces validators in different places.
})
export class NoSpaceDirective implements Validator{

  constructor() { }
  validate(control: AbstractControl): ValidationErrors | null {
    return noSpaces(control);
  }
  registerOnValidatorChange?(fn: () => void): void {
    
  }

}
