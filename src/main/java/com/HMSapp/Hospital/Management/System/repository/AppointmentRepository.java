package com.HMSapp.Hospital.Management.System.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.HMSapp.Hospital.Management.System.entity.Appointment;

public interface AppointmentRepository extends JpaRepository<Appointment, Integer> {

}