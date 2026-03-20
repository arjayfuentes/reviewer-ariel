import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpringBootApplicationTestComponent } from './spring-boot-application-test.component';

describe('SpringBootApplicationTestComponent', () => {
  let component: SpringBootApplicationTestComponent;
  let fixture: ComponentFixture<SpringBootApplicationTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpringBootApplicationTestComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SpringBootApplicationTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
