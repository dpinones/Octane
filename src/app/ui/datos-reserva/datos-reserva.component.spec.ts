import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosReservaComponent } from './datos-reserva.component';

describe('DatosReservaComponent', () => {
  let component: DatosReservaComponent;
  let fixture: ComponentFixture<DatosReservaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatosReservaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosReservaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
