import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexPacienteComponent } from './index-paciente.component';

describe('IndexPacienteComponent', () => {
  let component: IndexPacienteComponent;
  let fixture: ComponentFixture<IndexPacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IndexPacienteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IndexPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
