import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BestPracticesListComponent } from './best-practices-list.component';

describe('BestPracticesListComponent', () => {
  let component: BestPracticesListComponent;
  let fixture: ComponentFixture<BestPracticesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BestPracticesListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BestPracticesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
