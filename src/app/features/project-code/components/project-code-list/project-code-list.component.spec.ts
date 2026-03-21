import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectCodeListComponent } from './project-code-list.component';

describe('ProjectCodeListComponent', () => {
  let component: ProjectCodeListComponent;
  let fixture: ComponentFixture<ProjectCodeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectCodeListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectCodeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
