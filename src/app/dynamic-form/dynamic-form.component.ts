import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { EmailValidator } from '../email-validator.service';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit {
  form!:FormGroup ;
  jsonConfig:any={};
  submitted = false;

constructor(private fb:FormBuilder , private emailValidator:EmailValidator){}

  ngOnInit():void{
    this.jsonConfig = this.getFormJson();
    console.log("JSON Config:", this.jsonConfig);
    this.createForm();
    console.log(this.form.value);
  }

  getFormJson() {
    return {
      fields: [
        { name: "username",type: "text",    label: "Username:", placeholder: "Enter your username", validations: { required: true } },
        { name: "email",   type: "email",   label: "Email:", placeholder: "Enter your email", validations: { required: true, email: true } },
        { name: "password",type: "password",label: "Password:", placeholder: "Enter your password", validations: { required: true, minlength: 6 } },
        { name: "hobbies", type: "group",   label: "Hobbies:",repeatable: true  },
        { name:"country",  type:"select",   label:"Country",options:["Egypt","UK","USA","Germany"], validations:{ required:true}},
        { name:"subscribe",type:"checkbox", label:"Subscribe to newsletter", value:false }  ]}}


  createForm(){
       this.form=this.fb.group({});
       this.jsonConfig.fields.forEach((field:any ) =>{
       if(field.type === 'group'&& field.repeatable){
       this.form.addControl(field.name,this.fb.array([])); }
       else{
       this.form.addControl(field.name,this.createFormControl(field)); }});
        console.log("Form Structure:",this.form.value);};


  createFormControl(field:any):any{
     const validators:any=[];
     const asyncValidators: any[] = [];
       if(field.validations){
        if(field.validations.required) validators.push(Validators.required);
        if (field.validations.minlength) validators.push(Validators.minLength(field.validations.minlength));
        if (field.validations?.email) {
         validators.push(Validators.email);
         asyncValidators.push(this.emailValidator.validate.bind(this.emailValidator));}}
        if (field.type === 'checkbox')
        {
         return this.fb.control(false, validators);
        }
         return this.fb.control('',{validators, asyncValidators});}

  get hobbies(): FormArray {
  return this.form.get('hobbies') as FormArray;
   }

  addHobby() {
  if (!this.hobbies) {
    console.error("Hobbies array is not initialized");
    return;
  }
  this.hobbies.push(this.fb.control(''));
  }

  submitForm(){
    if (this.form.valid) {
     console.log("Form Submitted:", this.form.value);
     this.submitted = true;
     localStorage.setItem('Form Data', JSON.stringify(this.form.value));
}
}
}



