import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectiveUserTabComponent } from './objective-user-tab.component';

describe('ObjectiveUserTabComponent', () => {
  let component: ObjectiveUserTabComponent;
  let fixture: ComponentFixture<ObjectiveUserTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObjectiveUserTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectiveUserTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
