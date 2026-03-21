import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiyembroCodeDiscoveryComponent } from './miyembro-code-discovery.component';

describe('MiyembroCodeDiscoveryComponent', () => {
  let component: MiyembroCodeDiscoveryComponent;
  let fixture: ComponentFixture<MiyembroCodeDiscoveryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MiyembroCodeDiscoveryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MiyembroCodeDiscoveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
