import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularPrimengTailwindComponent } from './angular-primeng-tailwind.component';

describe('AngularPrimengTailwindComponent', () => {
  let component: AngularPrimengTailwindComponent;
  let fixture: ComponentFixture<AngularPrimengTailwindComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AngularPrimengTailwindComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AngularPrimengTailwindComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
