import { Directive, Renderer2, HostBinding, HostListener } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appSomeDirective]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: SomeDirectiveDirective,
    multi: true
}]  
})
export class SomeDirectiveDirective implements Validator{

  validate(control: AbstractControl): ValidationErrors {
    throw new Error('Method not implemented.');
  }
  registerOnValidatorChange?(fn: () => void): void {
    throw new Error('Method not implemented.');
  }

}
