import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectCodeReserbaUiNewComponent } from './project-code-reserba-ui-new.component';

describe('ProjectCodeReserbaUiNewComponent', () => {
  let component: ProjectCodeReserbaUiNewComponent;
  let fixture: ComponentFixture<ProjectCodeReserbaUiNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectCodeReserbaUiNewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectCodeReserbaUiNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
