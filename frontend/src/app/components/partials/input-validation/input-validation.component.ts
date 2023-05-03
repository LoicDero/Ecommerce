import { Component, Input, KeyValueDiffers, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl } from '@angular/forms';

const VALIDATORS_MESSAGES:any = {
  required:'Ne doit pas être vide',
  EMAIL:'Email non valide.',
  minlength: 'Doit contenir au moins 6 caractères',
  notMatch: 'Les mots de passe ne correspondent pas',
}

@Component({
  selector: 'input-validation',
  templateUrl: './input-validation.component.html',
  styleUrls: ['./input-validation.component.scss']
})
export class InputValidationComponent implements OnInit, OnChanges{

  @Input()
  control!: AbstractControl

  @Input()
  showErrorsWhen: boolean = true
  errorMessages: string[] = []

  ngOnChanges(changes: SimpleChanges): void {
    this.checkValidation()
  }

  ngOnInit(): void {
    this.control.statusChanges.subscribe(()=> {
      this.checkValidation()
    })
    this.control.valueChanges.subscribe(() =>{
      this.checkValidation()
    })
  }

  checkValidation(){
    const errors = this.control.errors;
    if(!errors){
      this.errorMessages = []
      return
    }

    const errorKeys = Object.keys(errors)
    this.errorMessages = errorKeys.map(key => VALIDATORS_MESSAGES[key])
  }
}
