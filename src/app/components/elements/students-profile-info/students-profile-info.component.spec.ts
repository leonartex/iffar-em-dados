import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsProfileInfoComponent } from './students-profile-info.component';

describe('StudentsProfileInfoComponent', () => {
  let component: StudentsProfileInfoComponent;
  let fixture: ComponentFixture<StudentsProfileInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentsProfileInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentsProfileInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
