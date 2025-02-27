import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'dynamic-form';
}

// this.jsonConfig = this.getFormJson();

  // getFormJson() {
  //   return {
  //     fields: [
  //       { name: "username", type: "text", label: "Username", placeholder: "Enter your username", validations: { required: true } },
  //       { name: "email", type: "email", label: "Email", placeholder: "Enter your email", validations: { required: true, email: true } },
  //       { name: "password", type: "password", label: "Password", placeholder: "Enter your password", validations: { required: true, minlength: 6 } },
  //       { name: "hobbies", type: "group", repeatable: true, label: "Hobbies" },
  //       {type:"select", label:"Country",name:"country",options:["Egypt","UK","USA","Germany"], validation:{ required:true}},
  //       { type:"checkbox",label:"Subscribe to newsletter",name:"subscribe", value:false }  ]}}

