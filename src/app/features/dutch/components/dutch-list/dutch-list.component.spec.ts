import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DutchListComponent } from './dutch-list.component';

describe('DutchListComponent', () => {
  let component: DutchListComponent;
  let fixture: ComponentFixture<DutchListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DutchListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DutchListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
