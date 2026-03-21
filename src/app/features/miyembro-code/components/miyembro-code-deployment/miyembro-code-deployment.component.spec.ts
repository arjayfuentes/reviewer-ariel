import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiyembroCodeDeploymentComponent } from './miyembro-code-deployment.component';

describe('MiyembroCodeDeploymentComponent', () => {
  let component: MiyembroCodeDeploymentComponent;
  let fixture: ComponentFixture<MiyembroCodeDeploymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MiyembroCodeDeploymentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MiyembroCodeDeploymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
