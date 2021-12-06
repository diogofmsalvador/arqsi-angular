import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchUserTabComponent } from './search-user-tab.component';

describe('SearchUserTabComponent', () => {
  let component: SearchUserTabComponent;
  let fixture: ComponentFixture<SearchUserTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchUserTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchUserTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
