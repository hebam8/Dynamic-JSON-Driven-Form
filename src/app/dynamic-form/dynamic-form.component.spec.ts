import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DynamicFormComponent } from './dynamic-form.component';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray ,FormControl  } from '@angular/forms';
import { CustomUppercasePipe } from '../custom-uppercase.pipe';
import { EmailValidator } from '../email-validator.service';
describe('DynamicFormComponent', () => {
  let component: DynamicFormComponent;
  let fixture: ComponentFixture<DynamicFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DynamicFormComponent,CustomUppercasePipe,EmailValidator],
      imports: [ReactiveFormsModule],
      providers: [FormBuilder]
    });
    const fb = TestBed.inject(FormBuilder);
    const emailValidator = TestBed.inject(EmailValidator);
    component = new DynamicFormComponent(fb, emailValidator);

    component.jsonConfig = component.getFormJson();
    component.createForm();

    fixture = TestBed.createComponent(DynamicFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
//ngOnInit fuction
  it('should initialize jsonConfig and create form on ngOnInit', () => {
    spyOn(component, 'getFormJson').and.callThrough();
    spyOn(component, 'createForm').and.callThrough();
    component.ngOnInit();
    expect(component.getFormJson).toHaveBeenCalled();
    expect(component.createForm).toHaveBeenCalled();
    expect(component.jsonConfig).toBeTruthy();
  });

  // createform function
  it('should create a FormGroup instance', () => {
    expect(component.form).toBeTruthy();
    expect(component.form instanceof FormGroup).toBeTrue();
  });

  it('should contain all fields from jsonConfig', () => {
    const fieldNames = component.jsonConfig.fields.map((field:any) => field.name);

    fieldNames.forEach((name:any) => {
      expect(component.form.contains(name)).toBeTrue();
    });
  });
  it('should create FormArray for repeatable group fields', () => {
    const hobbiesField = component.form.get('hobbies');
    expect(hobbiesField).toBeTruthy();
    expect(hobbiesField instanceof FormArray).toBeTrue();
  });
  it('should create FormControl for other fields', () => {
    const usernameField = component.form.get('username');
    const emailField = component.form.get('email');
    const passwordField = component.form.get('password');
    const countryField = component.form.get('country');
    const subscribeField = component.form.get('subscribe');
    expect(usernameField).toBeTruthy();
    expect(emailField).toBeTruthy();
    expect(passwordField).toBeTruthy();
    expect(countryField).toBeTruthy();
    expect(subscribeField).toBeTruthy();
  });


//createFormControl function
  it('should return a FormControl with default value "" for text fields', () => {
    const field = { name: 'username', type: 'text', validations: {} };
    const control = component.createFormControl(field);

    expect(control instanceof FormControl).toBeTrue();
    expect(control.value).toBe('');
  });

  it('should return a FormControl with default value false for checkbox fields', () => {
    const field = { name: 'subscribe', type: 'checkbox', validations: {} };
    const control = component.createFormControl(field);

    expect(control instanceof FormControl).toBeTrue();
    expect(control.value).toBeFalse();
  });

  it('should apply required validation if specified', () => {
    const field = { name: 'email', type: 'email', validations: { required: true } };
    const control = component.createFormControl(field);

    control.setValue('');
    expect(control.hasError('required')).toBeTrue();
  });
  it('should apply minlength validation if specified', () => {
    const field = { name: 'password', type: 'password', validations: { minlength: 6 } };
    const control = component.createFormControl(field);

    control.setValue('123');
    expect(control.hasError('minlength')).toBeTrue();
  });
  it('should apply email validation if specified', () => {
    const field = { name: 'email', type: 'email', validations: { email: true } };
    const control = component.createFormControl(field);

    control.setValue('invalid-email');
    expect(control.hasError('email')).toBeTrue();
  });


//hobbies function
it('should return FormArray for hobbies', () => {
  expect(component.hobbies).toBeInstanceOf(FormArray);
});
it('should add a new hobby to FormArray', () => {
  const initialLength = component.hobbies.length;
  component.addHobby();
  expect(component.hobbies.length).toBe(initialLength + 1);
});

//addHobby function
it('should log an error if hobbies array is not initialized', () => {
  spyOn(console, 'error');
  component.form.removeControl('hobbies');
  component.addHobby();
  expect(console.error).toHaveBeenCalledWith("Hobbies array is not initialized");
});
//submitForm
  it('should not submit if form is invalid', () => {
    spyOn(localStorage, 'setItem');
    component.submitForm();
    expect(component.submitted).toBeFalse();
    expect(localStorage.setItem).not.toHaveBeenCalled();
  });

it('should submit if form is valid'),()=>{
  spyOn(localStorage,'setItem');
  component.submitForm();
  expect(component.submitted).toBeTrue();
  expect(localStorage.setItem).toHaveBeenCalled();
}

});
