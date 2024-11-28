import { Appointment } from './appointment';
import { Patient } from './patient';

export class MedicalRecord {
  recordID?: number;
  diagnosis: string="";
  medications: string="";
  treatment: string="";
  diagnosisDate?: string;
  payment: number=0;
  appointment?: {
    appointmentID: number;
  };
  patient?: {
    patientID: number;
  };
}
