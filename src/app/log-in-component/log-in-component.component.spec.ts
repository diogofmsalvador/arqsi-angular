import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LogInComponentComponent } from './log-in-component.component';
import { By } from '@angular/platform-browser';
import { FormGroup, ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { RouterTestingModule } from '@angular/router/testing';

describe('LogInComponentComponent', () => {
  let component: LogInComponentComponent;
  let fixture: ComponentFixture<LogInComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogInComponentComponent ],
      imports: [
        BrowserAnimationsModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule
      ],
     // schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  
    fixture = TestBed.createComponent(LogInComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy(); 
  });

  it(`should have 'isRegisterClicked' as false`, () => {
    expect(component.isRegisterClicked).toEqual(false);
  });

  it(`closeRegister to be truthy`, () => {
    expect(component.closeRegister).toBeTruthy()
  });

  it(`isregisterClicked true`, () => {
    expect(component.initRegister).toBeTruthy()
  });
});
