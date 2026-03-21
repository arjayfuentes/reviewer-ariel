import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SdlcListComponent } from './sdlc-list.component';

describe('SdlcListComponent', () => {
  let component: SdlcListComponent;
  let fixture: ComponentFixture<SdlcListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SdlcListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SdlcListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
