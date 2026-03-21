import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiyembroCodeMemberComponent } from './miyembro-code-member.component';

describe('MiyembroCodeMemberComponent', () => {
  let component: MiyembroCodeMemberComponent;
  let fixture: ComponentFixture<MiyembroCodeMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MiyembroCodeMemberComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MiyembroCodeMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
