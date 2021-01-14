import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReserPassComponent } from './reser-pass.component';

describe('ReserPassComponent', () => {
  let component: ReserPassComponent;
  let fixture: ComponentFixture<ReserPassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReserPassComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReserPassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
