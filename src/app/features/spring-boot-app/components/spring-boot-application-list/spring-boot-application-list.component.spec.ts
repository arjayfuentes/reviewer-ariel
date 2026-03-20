import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpringBootApplicationListComponent } from './spring-boot-application-list.component';

describe('SpringBootApplicationListComponent', () => {
  let component: SpringBootApplicationListComponent;
  let fixture: ComponentFixture<SpringBootApplicationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpringBootApplicationListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SpringBootApplicationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
