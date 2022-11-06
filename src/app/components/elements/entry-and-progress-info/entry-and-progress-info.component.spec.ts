import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryAndProgressInfoComponent } from './entry-and-progress-info.component';

describe('EntryAndProgressInfoComponent', () => {
  let component: EntryAndProgressInfoComponent;
  let fixture: ComponentFixture<EntryAndProgressInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntryAndProgressInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntryAndProgressInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
