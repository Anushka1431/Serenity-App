package com.HMSapp.Hospital.Management.System.entity;

import java.sql.Date;

import java.sql.Time;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="Appointments")
public class Appointment {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "appointmentID")
    private int appointmentID;

    @Column(name = "patientID")
    private int patientID;

    @Column(name = "doctorID")
    private int doctorID;

    @Column(name = "appointmentDate")
    private Date appointmentDate;

    @Column(name = "appointmentTime")
    private Time appointmentTime;

    private String status;

    // Getter and setter methods

    @ManyToOne
    @JoinColumn(name = "patientID", referencedColumnName = "patientID", insertable = false, updatable = false)
    private Patient patient;

    @ManyToOne
    @JoinColumn(name = "doctorID", referencedColumnName = "doctorID", insertable = false, updatable = false)
    private Doctor doctor;

	public Appointment(int appointmentID, int patientID, int doctorID, Date appointmentDate, Time appointmentTime,
			String status, Patient patient, Doctor doctor) {
		super();
		this.appointmentID = appointmentID;
		this.patientID = patientID;
		this.doctorID = doctorID;
		this.appointmentDate = appointmentDate;
		this.appointmentTime = appointmentTime;
		this.status = status;
		this.patient = patient;
		this.doctor = doctor;
	}

	public Appointment() {
		super();
		// TODO Auto-generated constructor stub
	}

	public int getAppointmentID() {
		return appointmentID;
	}

	public void setAppointmentID(int appointmentID) {
		this.appointmentID = appointmentID;
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

	public Date getAppointmentDate() {
		return appointmentDate;
	}

	public void setAppointmentDate(Date appointmentDate) {
		this.appointmentDate = appointmentDate;
	}

	public Time getAppointmentTime() {
		return appointmentTime;
	}

	public void setAppointmentTime(Time appointmentTime) {
		this.appointmentTime = appointmentTime;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
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