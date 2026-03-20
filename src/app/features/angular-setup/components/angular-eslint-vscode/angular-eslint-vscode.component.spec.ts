import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularEslintVscodeComponent } from './angular-eslint-vscode.component';

describe('AngularEslintVscodeComponent', () => {
  let component: AngularEslintVscodeComponent;
  let fixture: ComponentFixture<AngularEslintVscodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AngularEslintVscodeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AngularEslintVscodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
