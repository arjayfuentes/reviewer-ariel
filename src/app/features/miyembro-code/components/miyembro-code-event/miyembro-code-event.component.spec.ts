import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiyembroCodeEventComponent } from './miyembro-code-event.component';

describe('MiyembroCodeEventComponent', () => {
  let component: MiyembroCodeEventComponent;
  let fixture: ComponentFixture<MiyembroCodeEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MiyembroCodeEventComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MiyembroCodeEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
