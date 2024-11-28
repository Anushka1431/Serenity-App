package com.HMSapp.Hospital.Management.System.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.HMSapp.Hospital.Management.System.entity.MedicalRecord;

public interface MedicalRecordRepository extends JpaRepository<MedicalRecord, Integer>{

}
