import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularTutorialListComponent } from './angular-tutorial-list.component';

describe('AngularTutorialListComponent', () => {
  let component: AngularTutorialListComponent;
  let fixture: ComponentFixture<AngularTutorialListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AngularTutorialListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AngularTutorialListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
