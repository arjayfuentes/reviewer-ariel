import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpringBootDatabaseConnectIntellijComponent } from './spring-boot-database-connect-intellij.component';

describe('SpringBootDatabaseConnectIntellijComponent', () => {
  let component: SpringBootDatabaseConnectIntellijComponent;
  let fixture: ComponentFixture<SpringBootDatabaseConnectIntellijComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpringBootDatabaseConnectIntellijComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SpringBootDatabaseConnectIntellijComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
