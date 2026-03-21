import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SdlcInfoComponent } from './sdlc-info.component';

describe('SdlcInfoComponent', () => {
  let component: SdlcInfoComponent;
  let fixture: ComponentFixture<SdlcInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SdlcInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SdlcInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
