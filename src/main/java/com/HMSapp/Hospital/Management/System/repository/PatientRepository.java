package com.HMSapp.Hospital.Management.System.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.HMSapp.Hospital.Management.System.entity.Patient;

@Repository
public interface PatientRepository extends JpaRepository<Patient, Integer>{
	
	
}
