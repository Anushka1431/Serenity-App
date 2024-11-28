package com.HMSapp.Hospital.Management.System.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.HMSapp.Hospital.Management.System.entity.MedicalRecord;
import com.HMSapp.Hospital.Management.System.repository.MedicalRecordRepository;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/medicalrecords")
public class MedicalRecordController {

    private MedicalRecordRepository medicalRecordRepository;

    @Autowired
    public MedicalRecordController(MedicalRecordRepository medicalRecordRepository) {
        this.medicalRecordRepository = medicalRecordRepository;
    }

    @PostMapping("/insert")
    public MedicalRecord createMedicalRecord(@RequestBody MedicalRecord medicalRecord) {
        return medicalRecordRepository.save(medicalRecord);
    }

    @GetMapping
    public List<MedicalRecord> getAllMedicalRecords() {
        return medicalRecordRepository.findAll();
    }
}
