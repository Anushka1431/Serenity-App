package com.HMSapp.Hospital.Management.System.entity;



import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;


import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name="Doctor")
public class Doctor {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "doctorID")
    private int doctorID;

    private String name;
    private String specialization;
    private String contact;
	public Doctor(int doctorID, String name, String specialization, String contact) {
		super();
		this.doctorID = doctorID;
		this.name = name;
		this.specialization = specialization;
		this.contact = contact;
	}
	public Doctor() {
		super();
		// TODO Auto-generated constructor stub
	}
	public int getDoctorID() {
		return doctorID;
	}
	public void setDoctorID(int doctorID) {
		this.doctorID = doctorID;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getSpecialization() {
		return specialization;
	}
	public void setSpecialization(String specialization) {
		this.specialization = specialization;
	}
	public String getContact() {
		return contact;
	}
	public void setContact(String contact) {
		this.contact = contact;
	}
}

   
    // Getter and setter methods

    

    