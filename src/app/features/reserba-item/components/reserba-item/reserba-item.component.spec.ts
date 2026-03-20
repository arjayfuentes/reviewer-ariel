import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReserbaItemComponent } from './reserba-item.component';

describe('ReserbaItemComponent', () => {
  let component: ReserbaItemComponent;
  let fixture: ComponentFixture<ReserbaItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReserbaItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReserbaItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
