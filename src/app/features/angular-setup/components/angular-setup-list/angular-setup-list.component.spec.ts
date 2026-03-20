import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularSetupListComponent } from './angular-setup-list.component';

describe('AngularSetupListComponent', () => {
  let component: AngularSetupListComponent;
  let fixture: ComponentFixture<AngularSetupListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AngularSetupListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AngularSetupListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
