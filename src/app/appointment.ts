import { Patient } from "./patient";
import { Doctor } from "./doctor";

export class Appointment {
    appointmentID: number = 0;
    patientID: number = 0;
    doctorID: number = 0;
    
    appointmentDate: Date=new Date();
    appointmentTime: string = "";
    status: string = "";
    patient: Patient | null = null;
    doctor: Doctor | null=null;
}