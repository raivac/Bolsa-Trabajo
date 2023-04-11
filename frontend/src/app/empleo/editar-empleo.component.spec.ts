import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarEmpleoComponent } from './editar-empleo.component';

describe('EditarEmpleoComponent', () => {
  let component: EditarEmpleoComponent;
  let fixture: ComponentFixture<EditarEmpleoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarEmpleoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarEmpleoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
