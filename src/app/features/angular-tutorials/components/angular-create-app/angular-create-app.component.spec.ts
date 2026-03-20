import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularCreateAppComponent } from './angular-create-app.component';

describe('AngularCreateAppComponent', () => {
  let component: AngularCreateAppComponent;
  let fixture: ComponentFixture<AngularCreateAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AngularCreateAppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AngularCreateAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
