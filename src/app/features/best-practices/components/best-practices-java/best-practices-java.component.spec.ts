import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BestPracticesJavaComponent } from './best-practices-java.component';

describe('BestPracticesJavaComponent', () => {
  let component: BestPracticesJavaComponent;
  let fixture: ComponentFixture<BestPracticesJavaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BestPracticesJavaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BestPracticesJavaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
