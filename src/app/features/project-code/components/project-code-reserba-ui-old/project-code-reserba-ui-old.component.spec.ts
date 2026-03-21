import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectCodeReserbaUiOldComponent } from './project-code-reserba-ui-old.component';

describe('ProjectCodeReserbaUiOldComponent', () => {
  let component: ProjectCodeReserbaUiOldComponent;
  let fixture: ComponentFixture<ProjectCodeReserbaUiOldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectCodeReserbaUiOldComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectCodeReserbaUiOldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
