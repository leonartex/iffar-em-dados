import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitsMapComponent } from './units-map.component';

describe('UnitsMapComponent', () => {
  let component: UnitsMapComponent;
  let fixture: ComponentFixture<UnitsMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnitsMapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnitsMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
