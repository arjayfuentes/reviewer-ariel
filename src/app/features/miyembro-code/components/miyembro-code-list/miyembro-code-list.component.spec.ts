import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiyembroCodeListComponent } from './miyembro-code-list.component';

describe('MiyembroCodeListComponent', () => {
  let component: MiyembroCodeListComponent;
  let fixture: ComponentFixture<MiyembroCodeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MiyembroCodeListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MiyembroCodeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
