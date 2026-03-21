import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BestPracticesCssComponent } from './best-practices-css.component';

describe('BestPracticesCssComponent', () => {
  let component: BestPracticesCssComponent;
  let fixture: ComponentFixture<BestPracticesCssComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BestPracticesCssComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BestPracticesCssComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
