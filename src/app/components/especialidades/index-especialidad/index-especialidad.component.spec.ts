import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexEspecialidadComponent } from './index-especialidad.component';

describe('IndexEspecialidadComponent', () => {
  let component: IndexEspecialidadComponent;
  let fixture: ComponentFixture<IndexEspecialidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IndexEspecialidadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IndexEspecialidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
