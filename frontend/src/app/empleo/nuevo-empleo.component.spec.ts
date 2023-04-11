import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoEmpleoComponent } from './nuevo-empleo.component';

describe('NuevoEmpleoComponent', () => {
  let component: NuevoEmpleoComponent;
  let fixture: ComponentFixture<NuevoEmpleoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevoEmpleoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NuevoEmpleoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
