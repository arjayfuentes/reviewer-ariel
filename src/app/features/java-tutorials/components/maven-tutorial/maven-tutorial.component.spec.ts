import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MavenTutorialComponent } from './maven-tutorial.component';

describe('MavenTutorialComponent', () => {
  let component: MavenTutorialComponent;
  let fixture: ComponentFixture<MavenTutorialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MavenTutorialComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MavenTutorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
