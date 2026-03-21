import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiyembroCodeEmailComponent } from './miyembro-code-email.component';

describe('MiyembroCodeEmailComponent', () => {
  let component: MiyembroCodeEmailComponent;
  let fixture: ComponentFixture<MiyembroCodeEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MiyembroCodeEmailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MiyembroCodeEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
