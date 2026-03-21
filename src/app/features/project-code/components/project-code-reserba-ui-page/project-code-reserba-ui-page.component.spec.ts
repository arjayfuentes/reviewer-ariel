import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectCodeReserbaUiPageComponent } from './project-code-reserba-ui-page.component';

describe('ProjectCodeReserbaUiPageComponent', () => {
  let component: ProjectCodeReserbaUiPageComponent;
  let fixture: ComponentFixture<ProjectCodeReserbaUiPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectCodeReserbaUiPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectCodeReserbaUiPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
