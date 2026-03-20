import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JavaTutorialListComponent } from './java-tutorial-list.component';

describe('JavaTutorialListComponent', () => {
  let component: JavaTutorialListComponent;
  let fixture: ComponentFixture<JavaTutorialListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JavaTutorialListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(JavaTutorialListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
