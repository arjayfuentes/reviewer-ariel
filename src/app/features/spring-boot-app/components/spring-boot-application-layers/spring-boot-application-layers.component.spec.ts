import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpringBootApplicationLayersComponent } from './spring-boot-application-layers.component';

describe('SpringBootApplicationLayersComponent', () => {
  let component: SpringBootApplicationLayersComponent;
  let fixture: ComponentFixture<SpringBootApplicationLayersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpringBootApplicationLayersComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SpringBootApplicationLayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
