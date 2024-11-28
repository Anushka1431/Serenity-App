import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnosePatientComponent } from './diagnose-patient.component';

describe('DiagnosePatientComponent', () => {
  let component: DiagnosePatientComponent;
  let fixture: ComponentFixture<DiagnosePatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DiagnosePatientComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DiagnosePatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
