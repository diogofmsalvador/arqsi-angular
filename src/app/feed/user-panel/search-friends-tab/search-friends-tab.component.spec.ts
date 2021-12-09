import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFriendsTabComponent } from './search-friends-tab.component';

describe('SearchFriendsTabComponent', () => {
  let component: SearchFriendsTabComponent;
  let fixture: ComponentFixture<SearchFriendsTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchFriendsTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchFriendsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
