import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppStudySheetComponent } from './app-study-sheet.component';

describe('AppStudySheetComponent', () => {
  let component: AppStudySheetComponent;
  let fixture: ComponentFixture<AppStudySheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppStudySheetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppStudySheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
