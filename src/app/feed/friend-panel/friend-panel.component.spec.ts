import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FriendPanelComponent } from './friend-panel.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatSnackBarModule} from "@angular/material/snack-bar";

describe('FriendPanelComponent', () => {
  let component: FriendPanelComponent;
  let fixture: ComponentFixture<FriendPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FriendPanelComponent ],
      imports: [
        MatDialogModule,
        MatSnackBarModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('opendialog to be true', () => {
    expect(component.openDialog).toBeTruthy()
  });
});
