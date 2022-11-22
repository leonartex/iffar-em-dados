import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseDetailingComponent } from './course-detailing.component';

describe('CourseDetailingComponent', () => {
  let component: CourseDetailingComponent;
  let fixture: ComponentFixture<CourseDetailingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseDetailingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseDetailingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
