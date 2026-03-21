import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiyembroCodeGatewayComponent } from './miyembro-code-gateway.component';

describe('MiyembroCodeGatewayComponent', () => {
  let component: MiyembroCodeGatewayComponent;
  let fixture: ComponentFixture<MiyembroCodeGatewayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MiyembroCodeGatewayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MiyembroCodeGatewayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
