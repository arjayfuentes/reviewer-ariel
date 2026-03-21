import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiyembroCodeOrganizationComponent } from './miyembro-code-organization.component';

describe('MiyembroCodeOrganizationComponent', () => {
  let component: MiyembroCodeOrganizationComponent;
  let fixture: ComponentFixture<MiyembroCodeOrganizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MiyembroCodeOrganizationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MiyembroCodeOrganizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
