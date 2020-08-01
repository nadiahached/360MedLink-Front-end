package org.sid.web;

import lombok.Data;
import org.sid.dao.SalaryRepository;
import org.sid.entities.Comsuption;
import org.sid.entities.Salary;
import org.sid.service.BillingServcie;
import org.sid.service.SalaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Date;
import java.util.List;


@RestController
public class SalaryController {
    @Autowired
    SalaryService salaryService;
    @PostMapping("/salary")
    //pour payer un salaryé"
    public Salary saveItem(@RequestBody SalaryForm salaryForm){
        LocalDate date = LocalDate.parse(salaryForm.getDate()).plusDays(1);
        Salary salary=new Salary(null,salaryForm.getIduser(),salaryForm.getTitre(),salaryForm.getSalary(),date);
        return salaryService.AddSalary(salary);
    }
    @DeleteMapping("/salary/{id}")
    //pour payer un salaryé"
    public void deleteitem(@PathVariable int id){
        salaryService.DeleteHistoricSalary(id);
    }
    //pour retourner l'histoirique des payment
    @GetMapping ("/salary")
    public List<Salary> getSalary(){
        return salaryService.getAllSalleries();
    }
    //pour retourner un l'historique d'un utilisateur.
    @GetMapping ("/salary/user/{id}")
    public List<Salary> getUserSalary(@PathVariable int id ){
        return salaryService.GetUserSalaries(id);
    }
}

@Data
class SalaryForm{
    public int iduser;
    public String titre;
    public String salary;
    public String date;
}
