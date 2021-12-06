import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntroductionRequestComponent } from './introduction-request.component';

describe('IntroductionRequestComponent', () => {
  let component: IntroductionRequestComponent;
  let fixture: ComponentFixture<IntroductionRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntroductionRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntroductionRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
