import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexCitaComponent } from './index-cita.component';

describe('IndexCitaComponent', () => {
  let component: IndexCitaComponent;
  let fixture: ComponentFixture<IndexCitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IndexCitaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IndexCitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
