import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiyembroCodeConfigServerComponent } from './miyembro-code-config-server.component';

describe('MiyembroCodeConfigServerComponent', () => {
  let component: MiyembroCodeConfigServerComponent;
  let fixture: ComponentFixture<MiyembroCodeConfigServerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MiyembroCodeConfigServerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MiyembroCodeConfigServerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
