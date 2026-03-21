import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BestPracticesSpringBootComponent } from './best-practices-spring-boot.component';

describe('BestPracticesSpringBootComponent', () => {
  let component: BestPracticesSpringBootComponent;
  let fixture: ComponentFixture<BestPracticesSpringBootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BestPracticesSpringBootComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BestPracticesSpringBootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
