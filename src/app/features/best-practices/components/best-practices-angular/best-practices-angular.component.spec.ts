import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BestPracticesAngularComponent } from './best-practices-angular.component';

describe('BestPracticesAngularComponent', () => {
  let component: BestPracticesAngularComponent;
  let fixture: ComponentFixture<BestPracticesAngularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BestPracticesAngularComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BestPracticesAngularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
