import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpringBootFlywayComponent } from './spring-boot-flyway.component';

describe('SpringBootFlywayComponent', () => {
  let component: SpringBootFlywayComponent;
  let fixture: ComponentFixture<SpringBootFlywayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpringBootFlywayComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SpringBootFlywayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
