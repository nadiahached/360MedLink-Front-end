package org.sid.web;

import lombok.Data;
import org.sid.dao.AppUserRepository;
import org.sid.entities.AppUser;
import org.sid.service.AccountService;
import org.sid.service.RhService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@RestController
public class EmployController {
    @Autowired
    private RhService rhService;
    @Autowired
    private AppUserRepository appUserRepository;

    @PostMapping("/employe")
    public AppUser register(@RequestBody UserForm userForm){

        return  rhService.addEmployer(userForm.email,userForm.password, userForm.contact,
                                      userForm.firstName,userForm.secondeName,userForm.birthday,
                                      userForm.salaire,userForm.managerName,userForm.manager_id,userForm.cin,
                                      userForm.rib,userForm.adresse, userForm.titre,userForm.rejoint_time,
                                      userForm.cota);
    }
    @PutMapping("/employe/{id}")
    public AppUser updateEmploye(@PathVariable int id,@RequestBody UserForm userForm){

        return rhService.updateUser(id,userForm.contact,
                userForm.firstName,userForm.secondeName,userForm.birthday,
                userForm.salaire,userForm.managerName,userForm.manager_id,userForm.cin,userForm.rib,userForm.adresse,
                userForm.titre);
    }
    @GetMapping("/employe/details/{id}")
    public AppUser recherEmploye(@PathVariable int id){
        return rhService.recherchebyId(id);
    }
    @DeleteMapping("/employe/{id}")
    public void deleteEmploye(@PathVariable int id){
         rhService.deletebyId(id);
    }
    @GetMapping("/employe/{firstName}")
    public List<AppUser> rechercheUser(@PathVariable String firstName ){
        return rhService.recherche(firstName);
    }

    @GetMapping("/employe/titre/{titre}")
    public List<AppUser> rechercheUserByTitre(@PathVariable String titre ){
        return rhService.recherchebyJob(titre);
    }
}
@Data
class UserForm{
    public  String  email;
    public  String  password;
    public  String  contact;
    public  String  firstName;
    public  String  secondeName;
    public  String  birthday;
    public  String  salaire;
    public  String  cin;
    public  String  rib;
    public  String  managerName;
    public  Integer manager_id;
    public  String  adresse;
    public  String  titre;
    public  String  rejoint_time;
    public  Double  cota;
    public  Double  solde;
}