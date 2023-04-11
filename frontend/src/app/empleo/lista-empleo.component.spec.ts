import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaEmpleoComponent } from './lista-empleo.component';

describe('ListaEmpleoComponent', () => {
  let component: ListaEmpleoComponent;
  let fixture: ComponentFixture<ListaEmpleoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaEmpleoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaEmpleoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
