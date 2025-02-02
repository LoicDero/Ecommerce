import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl, FormControlName } from '@angular/forms';

@Component({
  selector: 'text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss']
})
export class TextInputComponent {

  @Input()
  control!:AbstractControl

  @Input()
  showErrorsWhen:boolean = false

  @Input()
  label!: string

  @Input()
  type: 'text' | 'password' | 'email' = 'text'

  get formControl(){
    return this.control as FormControl
  }
}
