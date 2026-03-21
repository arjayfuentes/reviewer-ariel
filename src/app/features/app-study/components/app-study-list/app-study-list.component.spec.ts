import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppStudyListComponent } from './app-study-list.component';

describe('AppStudyListComponent', () => {
  let component: AppStudyListComponent;
  let fixture: ComponentFixture<AppStudyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppStudyListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppStudyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
