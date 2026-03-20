import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewerFileListComponent } from './reviewer-file-list.component';

describe('ReviewerFileListComponent', () => {
  let component: ReviewerFileListComponent;
  let fixture: ComponentFixture<ReviewerFileListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewerFileListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewerFileListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
