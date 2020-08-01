package org.sid.service;

import lombok.Data;
import org.sid.dao.AppRoleRepository;
import org.sid.dao.AppUserRepository;
import org.sid.entities.AppUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.Period;
import java.util.Date;
import java.util.List;

@Service
@Transactional
public class RhService {
    private AppUserRepository appUserRepository;
    private AppRoleRepository appRoleRepository;
    private BCryptPasswordEncoder bCryptPasswordEncoder;
    @Autowired
    private AccountService accountService;


    public RhService(AppUserRepository appUserRepository, AppRoleRepository appRoleRepository, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.appUserRepository = appUserRepository;
        this.appRoleRepository = appRoleRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    public AppUser addEmployer(String username, String password,
                               String contact, String firstName,
                               String secondeName, String birthday,
                               String salaire, String managerName,Integer manager_id,String cin,
                               String rib, String adresse,String titre, String rejoint_time,Double cota){
        LocalDate date =LocalDate.parse(birthday).plusDays(1);
        LocalDate rejointDate =LocalDate.parse(rejoint_time).plusDays(1);

        LocalDate now =LocalDate.now().plusDays(1);

        Period duration = Period.between(rejointDate, now);

        Double solde = (duration.getYears()*12+ duration.getMonths())*cota;

        return   accountService.saveUser(username,password, contact,firstName,
                                         secondeName,date,salaire,managerName,manager_id,
                                         cin,rib, adresse,titre,rejointDate,cota,solde);
    }
    public AppUser updateUser(int id, String contact, String firstName,
                              String secondeName, String birthday, String salaire,
                              String managerName,Integer manager_id,
                              String cin, String rib, String adresse,String titre){
        AppUser user =appUserRepository.findById(id);
        LocalDate date =LocalDate.parse(birthday).plusDays(1);
        user.setContact(contact);
        user.setFirstName(firstName);
        user.setSecondeName(secondeName);
        user.setBirthday(date);
        user.setSalaire(salaire);
        user.setCin(cin);
        user.setRib(rib);
        user.setManagerName(managerName);
        user.setManager_id(manager_id);
        user.setAdresse(adresse);
        user.setTitre(titre);
    /*    user.setRejoint_time(rejointDate);
        user.setCota(cota);
        user.setSolde(solde);*/
        return user;
    }
    public List<AppUser> recherche(String firstName){
       return appUserRepository.findByFirstName(firstName);
    }

    public List<AppUser> findByManagerName(String name){ return appUserRepository.findByManagerName(name);}

    public List<AppUser> recherchebyJob(String titre){ return appUserRepository.findByTitre(titre); }

    public AppUser recherchebyId(int id){ return appUserRepository.findById(id); }

    public void deletebyId(int id){  appUserRepository.deleteById(id); }

}
