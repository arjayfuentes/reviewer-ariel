import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpringBootApplicationOthersComponent } from './spring-boot-application-others.component';

describe('SpringBootApplicationOthersComponent', () => {
  let component: SpringBootApplicationOthersComponent;
  let fixture: ComponentFixture<SpringBootApplicationOthersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpringBootApplicationOthersComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SpringBootApplicationOthersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
