import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpringBootDatabaseDockerComponent } from './spring-boot-database-docker.component';

describe('SpringBootDatabaseDockerComponent', () => {
  let component: SpringBootDatabaseDockerComponent;
  let fixture: ComponentFixture<SpringBootDatabaseDockerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpringBootDatabaseDockerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SpringBootDatabaseDockerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
