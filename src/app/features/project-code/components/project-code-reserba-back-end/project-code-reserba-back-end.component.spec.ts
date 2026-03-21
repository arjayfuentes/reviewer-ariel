import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectCodeReserbaBackEndComponent } from './project-code-reserba-back-end.component';

describe('ProjectCodeReserbaBackEndComponent', () => {
  let component: ProjectCodeReserbaBackEndComponent;
  let fixture: ComponentFixture<ProjectCodeReserbaBackEndComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectCodeReserbaBackEndComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectCodeReserbaBackEndComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
