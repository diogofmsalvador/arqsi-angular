import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserPanelComponent } from './user-panel.component';
import {MatSnackBarModule} from "@angular/material/snack-bar";

describe('UserPanelComponent', () => {
  let component: UserPanelComponent;
  let fixture: ComponentFixture<UserPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserPanelComponent ],
      imports:[
        MatSnackBarModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('setUserSelected to be true', () => {
    expect(component.setUserSelected).toBeTruthy();
  });
});
