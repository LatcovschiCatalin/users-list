import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";
import {phoneNumberRegex, validationMessages} from "../../constants";

@Component({
  selector: 'sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  customForm: FormGroup;

  validators = {
    required: {
      type: 'required',
      message: validationMessages.requiredField
    },
    email: {
      type: 'email',
      message: validationMessages.email
    },
    phone: {
      type: 'pattern',
      args: phoneNumberRegex,
      message: validationMessages.invalidPhone
    },
  }

  formData = [
    {
      title: 'Name',
      key: 'name',
      type: 'text',
      default: '',
      validators: [this.validators.required]
    },
    {
      title: 'Surname',
      key: 'surname',
      type: 'text',
      default: '',
      validators: [this.validators.required]
    },
    {
      title: 'Email',
      key: 'email',
      type: 'text',
      default: '',
      validators: [this.validators.required, this.validators.email]
    },
    {
      title: 'Phone',
      key: 'phone',
      type: 'text',
      default: '',
      validators: [this.validators.required, this.validators.phone]
    },
    {
      title: 'Password',
      key: 'password',
      type: 'password',
      default: '',
      validators: [this.validators.required]
    },

  ]

  constructor(private fb: FormBuilder,
              private authService: AuthService) {

    this.customForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(phoneNumberRegex)]],
      password: ['', Validators.required],
    });
  }

  signUp() {
    const user = this.customForm.value;

    if (this.customForm.invalid) {
      this.customForm.markAllAsTouched();
      return false;
    } else {
      this.authService.signUp(user);
    }
    return user;
  }
}

