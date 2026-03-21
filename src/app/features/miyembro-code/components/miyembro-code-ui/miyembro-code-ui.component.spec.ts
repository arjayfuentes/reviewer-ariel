import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiyembroCodeUiComponent } from './miyembro-code-ui.component';

describe('MiyembroCodeUiComponent', () => {
  let component: MiyembroCodeUiComponent;
  let fixture: ComponentFixture<MiyembroCodeUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MiyembroCodeUiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MiyembroCodeUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
