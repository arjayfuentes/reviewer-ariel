import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularPluginsVscodeComponent } from './angular-plugins-vscode.component';

describe('AngularPluginsVscodeComponent', () => {
  let component: AngularPluginsVscodeComponent;
  let fixture: ComponentFixture<AngularPluginsVscodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AngularPluginsVscodeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AngularPluginsVscodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
