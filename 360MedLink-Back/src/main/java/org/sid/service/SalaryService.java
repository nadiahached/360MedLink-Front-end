package org.sid.service;

import org.sid.dao.SalaryRepository;
import org.sid.entities.Salary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalTime;
import java.util.List;

@Service
@Transactional
public class SalaryService {
    @Autowired
    public SalaryRepository salaryRepository;

    //pour recupérer tous les enregistrement des salares rembourcer
    public List<Salary> getAllSalleries(){
        return salaryRepository.findAll();
    }
    //pour recupérer tous les enregistrement des salares rembourcer pour un employé
    public List<Salary> GetUserSalaries(int id){
        return salaryRepository.findByIduserOrderByDate(id);
    }
    //pour  enregistrer un enregistrement de salaire
    public Salary AddSalary(Salary salary){
        return salaryRepository.save(salary);
    }
    //pour supprimer un enregistrement des salarire
    public void DeleteHistoricSalary(int id){
         salaryRepository.deleteById(id);
    }
}
