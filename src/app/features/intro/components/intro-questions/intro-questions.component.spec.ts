import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntroQuestionsComponent } from './intro-questions.component';

describe('IntroQuestionsComponent', () => {
  let component: IntroQuestionsComponent;
  let fixture: ComponentFixture<IntroQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IntroQuestionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IntroQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
