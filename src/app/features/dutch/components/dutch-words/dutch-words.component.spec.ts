import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DutchWordsComponent } from './dutch-words.component';

describe('DutchWordsComponent', () => {
  let component: DutchWordsComponent;
  let fixture: ComponentFixture<DutchWordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DutchWordsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DutchWordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
