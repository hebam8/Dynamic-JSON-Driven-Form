import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CustomUppercasePipe } from './custom-uppercase.pipe';
import { EmailValidator } from './email-validator.service';
@NgModule({
  declarations: [
    AppComponent,
    DynamicFormComponent,
    CustomUppercasePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule

  ],
  providers: [EmailValidator],
  bootstrap: [AppComponent]
})
export class AppModule { }
