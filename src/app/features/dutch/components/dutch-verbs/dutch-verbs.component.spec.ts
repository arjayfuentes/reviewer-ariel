import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DutchVerbsComponent } from './dutch-verbs.component';

describe('DutchVerbsComponent', () => {
  let component: DutchVerbsComponent;
  let fixture: ComponentFixture<DutchVerbsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DutchVerbsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DutchVerbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
