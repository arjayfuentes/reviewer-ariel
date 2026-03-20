import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpringBootApplicationLayersTestComparisonComponent } from './spring-boot-application-layers-test-comparison.component';

describe('SpringBootApplicationLayersTestComparisonComponent', () => {
  let component: SpringBootApplicationLayersTestComparisonComponent;
  let fixture: ComponentFixture<SpringBootApplicationLayersTestComparisonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpringBootApplicationLayersTestComparisonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SpringBootApplicationLayersTestComparisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
