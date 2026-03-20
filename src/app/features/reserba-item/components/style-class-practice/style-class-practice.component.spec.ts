import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StyleClassPracticeComponent } from './style-class-practice.component';

describe('StyleClassPracticeComponent', () => {
  let component: StyleClassPracticeComponent;
  let fixture: ComponentFixture<StyleClassPracticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StyleClassPracticeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StyleClassPracticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
