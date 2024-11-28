package com.HMSapp.Hospital.Management.System.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.HMSapp.Hospital.Management.System.entity.Appointment;
import com.HMSapp.Hospital.Management.System.repository.AppointmentRepository;
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/appointment")
public class AppointmentController {
	private AppointmentRepository appointmentRepository;

	public AppointmentController(AppointmentRepository appointmentRepository) {
		super();
		this.appointmentRepository = appointmentRepository;
	}
	
	@PostMapping("/insert")
	public Appointment createPatient(@RequestBody Appointment appointment) {
		return appointmentRepository.save(appointment);
		
	}
	@GetMapping
	public List<Appointment>getAllAppointments(){
		return appointmentRepository.findAll();
	}

}
