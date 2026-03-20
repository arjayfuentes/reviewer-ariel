import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularPrettierVscodeComponent } from './angular-prettier-vscode.component';

describe('AngularPrettierVscodeComponent', () => {
  let component: AngularPrettierVscodeComponent;
  let fixture: ComponentFixture<AngularPrettierVscodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AngularPrettierVscodeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AngularPrettierVscodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
