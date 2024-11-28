package com.HMSapp.Hospital.Management.System.entity;

import jakarta.persistence.Column;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="MedicalRecord")
public class MedicalRecord {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "recordID")
    private int recordID;

    @Column(name = "patientID")
    private int patientID;

    @Column(name = "doctorID")
    private int doctorID;

    private String diagnosis;
    private String medications;
    private String treatment;

    // Getter and setter methods
    
    @ManyToOne
    @JoinColumn(name = "patientID", referencedColumnName = "patientID", insertable = false, updatable = false)
    private Patient patient;

    @ManyToOne
    @JoinColumn(name = "doctorID", referencedColumnName = "doctorID", insertable = false, updatable = false)
    private Doctor doctor;

	public MedicalRecord(int recordID, int patientID, int doctorID, String diagnosis, String medications,
			String treatment, Patient patient, Doctor doctor) {
		super();
		this.recordID = recordID;
		this.patientID = patientID;
		this.doctorID = doctorID;
		this.diagnosis = diagnosis;
		this.medications = medications;
		this.treatment = treatment;
		this.patient = patient;
		this.doctor = doctor;
	}

	public MedicalRecord() {
		super();
		// TODO Auto-generated constructor stub
	}

	public int getRecordID() {
		return recordID;
	}

	public void setRecordID(int recordID) {
		this.recordID = recordID;
	}

	public int getPatientID() {
		return patientID;
	}

	public void setPatientID(int patientID) {
		this.patientID = patientID;
	}

	public int getDoctorID() {
		return doctorID;
	}

	public void setDoctorID(int doctorID) {
		this.doctorID = doctorID;
	}

	public String getDiagnosis() {
		return diagnosis;
	}

	public void setDiagnosis(String diagnosis) {
		this.diagnosis = diagnosis;
	}

	public String getMedications() {
		return medications;
	}

	public void setMedications(String medications) {
		this.medications = medications;
	}

	public String getTreatment() {
		return treatment;
	}

	public void setTreatment(String treatment) {
		this.treatment = treatment;
	}

	public Patient getPatient() {
		return patient;
	}

	public void setPatient(Patient patient) {
		this.patient = patient;
	}

	public Doctor getDoctor() {
		return doctor;
	}

	public void setDoctor(Doctor doctor) {
		this.doctor = doctor;
	}
    
    
}


