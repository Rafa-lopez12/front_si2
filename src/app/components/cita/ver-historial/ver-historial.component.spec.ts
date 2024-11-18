import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VerHistorialComponent } from './ver-historial.component';
import { NgxDropzoneModule } from 'ngx-dropzone';

describe('VerHistorialComponent', () => {
  let component: VerHistorialComponent;
  let fixture: ComponentFixture<VerHistorialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VerHistorialComponent],
      imports: [ReactiveFormsModule, FormsModule, NgxDropzoneModule] // Incluye NgxDropzoneModule aquí
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerHistorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
