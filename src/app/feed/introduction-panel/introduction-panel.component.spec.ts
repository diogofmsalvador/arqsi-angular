import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IntroductionPanelComponent } from './introduction-panel.component';
import { IIntroductionService } from '../../Services/iServices/introduction.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

describe('IntroductionPanelComponent', () => {
  let component: IntroductionPanelComponent;
  let fixture: ComponentFixture<IntroductionPanelComponent>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntroductionPanelComponent],
      imports:[HttpClientTestingModule ]
    })
    
    // Inject the http service and test controller for each test
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    //.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntroductionPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
