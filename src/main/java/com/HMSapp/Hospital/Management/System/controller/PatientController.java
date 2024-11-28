package com.HMSapp.Hospital.Management.System.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.management.AttributeNotFoundException;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.HMSapp.Hospital.Management.System.entity.MedicalRecord;
import com.HMSapp.Hospital.Management.System.entity.Patient;
import com.HMSapp.Hospital.Management.System.repository.PatientRepository;
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/patient")
public class PatientController {

	private PatientRepository patientRepository;

	public PatientController(PatientRepository patientRepository) {
		super();
		this.patientRepository = patientRepository;
	}
	
	@PostMapping("/insert")
	public Patient createPatient(@RequestBody Patient patient) {
		return patientRepository.save(patient);
		
	}
	@GetMapping
	public List<Patient>getAllPatient(){
		return patientRepository.findAll();
		
	}
	@DeleteMapping("/patients/{id}")
	public ResponseEntity<Map<String,Boolean>> deletePatient(@PathVariable Integer id) throws AttributeNotFoundException{
		
		Patient patient = patientRepository.findById(id)
				.orElseThrow(() -> new AttributeNotFoundException("ABCD" + id));
		
		patientRepository.delete(patient);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}
	
}
