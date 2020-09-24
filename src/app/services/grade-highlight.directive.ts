import { viewClassName } from '@angular/compiler';
import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  Renderer2,
  SimpleChanges,
} from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
} from '@angular/forms';

@Directive({
  selector: '[GradeHighlight]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: GradeHighlightDirective,
      multi: true,
    },
  ],
})
export class GradeHighlightDirective implements OnChanges, Validator {
  grade;
  element;

  @Input('inner') set inner(value) {
    this.grade = value;
  }

  constructor(public elementRef: ElementRef, public render: Renderer2) {
    // console.log(elementRef);
    this.element = elementRef.nativeElement;
    // console.log(elementRef, this.element);
  }
  ngOnChanges(_changes: SimpleChanges): void {
    // console.log(this.element, this.grade);
    // console.log(this.grade);
    this.render.setStyle(
      this.element,
      this.getStyle(this.element),
      this.gradeModifier(this.element, this.grade)
    );
  }

  validate(control: AbstractControl): ValidationErrors {
    const { value } = control;
    const errorValidation = [];
    this.grade = control.value;

    this.ngOnChanges(this.grade);

    if (!(0 < value && value < 6))
      errorValidation.push({
        msg: 'value is not in the range of 1-5',
        reason: 'value',
      });

    if (errorValidation.length) return errorValidation;

    return {};
  }

  registerOnValidatorChange?(_fn: () => void): void {}

  getStyle = (element) => {
    if (element.tagName === 'DIV') {
      return 'box-shadow';
    }
    if (element.tagName === 'SPAN') {
      return 'background';
    }
    if (element.tagName === 'INPUT') {
      return 'background';
    }
  };

  gradeModifier(element, grade) {
    if (element.tagName === 'DIV') {
      switch (Math.round(parseInt(grade))) {
        case 0:
        case 1:
          return 'inset 0px 0px 5px 0px red';
        case 2:
          return 'inset 0px 0px 5px 0px orange';
        case 3:
          return 'inset 0px 0px 5px 0px yellow';
        case 4:
          return 'inset 0px 0px 5px 0px lightgreen';
        case 5:
          return 'inset 0px 0px 5px 0px green';

        default:
          break;
      }
    }

    if (element.tagName === 'SPAN') {
      switch (Math.round(parseInt(grade))) {
        case 0:
        case 1:
          return 'red';
        case 2:
          return 'orange';
        case 3:
          return 'yellow';
        case 4:
          return 'lightgreen';
        case 5:
          return 'green';

        default:
          break;
      }
    }

    if (element.tagName === 'INPUT') {
      console.log('get', Math.round(parseInt(grade)));

      switch (Math.round(parseInt(grade))) {
        case 0:
        case 1:
          return 'red';
        case 2:
          return 'orange';
        case 3:
          return 'yellow';
        case 4:
          return 'lightgreen';
        case 5:
          return 'green';

        default:
          break;
      }
    }
  }
}
