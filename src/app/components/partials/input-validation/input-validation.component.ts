import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl } from '@angular/forms';

const VALIDATORS_MESSAGES : any = {
  required: 'Should not be empty',
  email: 'Email is not valid'
}

@Component({
  selector: 'input-validation',
  templateUrl: './input-validation.component.html',
  styleUrls: ['./input-validation.component.scss']
})
export class InputValidationComponent implements OnChanges, OnInit {

  @Input()
  control!: AbstractControl

  @Input()
  showErrorsWhen: boolean = true

  errorMessages: string[] =[]

  ngOnChanges(changes: SimpleChanges): void {
   this.checkValidation()
  }

  ngOnInit(): void {
    this.control.statusChanges.subscribe(() => {
      this.checkValidation()
    })
    this.control.valueChanges.subscribe(() => {
      this.checkValidation()
    })
  }

  checkValidation(){
    const error = this.control.errors

    if(!error){
      this.errorMessages = []
      return
    }

    const errorKey = Object.keys(error)
    this.errorMessages = errorKey.map( key => VALIDATORS_MESSAGES[key])
  }
}
