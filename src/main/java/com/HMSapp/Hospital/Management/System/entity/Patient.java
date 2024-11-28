package com.HMSapp.Hospital.Management.System.entity;

import java.sql.Date;
import java.util.List;

import jakarta.persistence.Column;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name="Patient")
public class Patient {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "patientID")
    private int patientID;

    private String Fname;
    private String Lname;
    private String gender;

    @Column(name = "dateOfBirth")
    private Date dateOfBirth;

    private String bloodgroup;
    private String contact;
    
    

    public Patient(int patientID, String fname, String lname, String gender, Date dateOfBirth, String bloodgroup,
			String contact) {
		super();
		this.patientID = patientID;
		Fname = fname;
		Lname = lname;
		this.gender = gender;
		this.dateOfBirth = dateOfBirth;
		this.bloodgroup = bloodgroup;
		this.contact = contact;
    }

	// Getter and setter methods

    public Patient() {
		super();
		// TODO Auto-generated constructor stub
	}

	public int getPatientID() {
		return patientID;
	}

	public void setPatientID(int patientID) {
		this.patientID = patientID;
	}

	public String getFname() {
		return Fname;
	}

	public void setFname(String fname) {
		Fname = fname;
	}

	public String getLname() {
		return Lname;
	}

	public void setLname(String lname) {
		Lname = lname;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public Date getDateOfBirth() {
		return dateOfBirth;
	}

	public void setDateOfBirth(Date dateOfBirth) {
		this.dateOfBirth = dateOfBirth;
	}

	public String getBloodgroup() {
		return bloodgroup;
	}

	public void setBloodgroup(String bloodgroup) {
		this.bloodgroup = bloodgroup;
	}

	public String getContact() {
		return contact;
	}

	public void setContact(String contact) {
		this.contact = contact;
	}

	
	

	
	
}
    