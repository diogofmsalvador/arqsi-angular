import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IntroductionMessageDialogComponent } from './introduction-message-dialog.component';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

describe('IntroductionMessageDialogComponent', () => {
  let component: IntroductionMessageDialogComponent;
  let fixture: ComponentFixture<IntroductionMessageDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntroductionMessageDialogComponent ],
      imports: [
        MatDialogModule
      ],
      providers: [
        {provide: MatDialogRef, useValue: {}},
        {provide: MAT_DIALOG_DATA, useValue: {} },
      ]

    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntroductionMessageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('be true on onNoclick', () => {
    expect(component.onNoClick).toBeTruthy();
  });

  it('onNoclick after opened should be false', () => {
    expect(component.dialogRef.afterOpened).toBeFalsy();
  });
});
