import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppStudyQuestionsComponent } from './app-study-questions.component';

describe('AppStudyQuestionsComponent', () => {
  let component: AppStudyQuestionsComponent;
  let fixture: ComponentFixture<AppStudyQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppStudyQuestionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppStudyQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
