import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntroSentencesComponent } from './intro-sentences.component';

describe('IntroSentencesComponent', () => {
  let component: IntroSentencesComponent;
  let fixture: ComponentFixture<IntroSentencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IntroSentencesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IntroSentencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
