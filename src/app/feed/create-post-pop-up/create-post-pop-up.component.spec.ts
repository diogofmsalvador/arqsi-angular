import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePostPopUpComponent } from './create-post-pop-up.component';

describe('CreatePostPopUpComponent', () => {
  let component: CreatePostPopUpComponent;
  let fixture: ComponentFixture<CreatePostPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePostPopUpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePostPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
