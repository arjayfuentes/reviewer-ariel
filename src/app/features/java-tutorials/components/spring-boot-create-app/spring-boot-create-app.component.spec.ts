import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpringBootCreateAppComponent } from './spring-boot-create-app.component';

describe('SpringBootCreateAppComponent', () => {
  let component: SpringBootCreateAppComponent;
  let fixture: ComponentFixture<SpringBootCreateAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpringBootCreateAppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SpringBootCreateAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
