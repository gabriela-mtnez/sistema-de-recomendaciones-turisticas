import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandinngComponent } from './landinng.component';

describe('LandinngComponent', () => {
  let component: LandinngComponent;
  let fixture: ComponentFixture<LandinngComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandinngComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandinngComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
