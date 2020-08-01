package org.sid.service;

import org.sid.dao.AppRoleRepository;
import org.sid.dao.AppUserRepository;
import org.sid.entities.AppRole;
import org.sid.entities.AppUser;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.management.relation.Role;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.*;

@Service
@Transactional
public class AccountServiceImpl implements AccountService {
    private AppUserRepository appUserRepository;
    private AppRoleRepository appRoleRepository;
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public AccountServiceImpl(AppUserRepository appUserRepository, AppRoleRepository appRoleRepository, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.appUserRepository = appUserRepository;
        this.appRoleRepository = appRoleRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    @Override
    public AppUser deleteRole(String username , String roleName) {
        Collection<AppRole> roles = new ArrayList<>();
        AppUser user=this.loadUserByUsername(username);
        AppRole role=appRoleRepository.findByRoleName(roleName);
        roles=user.getRoles();
        if(this.isVerifRole(user.getRoles(),roleName)){
            roles.remove(role);
            user.setRoles(roles);
            return user;
        }
        else throw new RuntimeException("user ma3andouch el role eli bch tfaskhou");
    }
    public boolean isVerifRole(Collection<AppRole> roles,String roleName) {
        for (AppRole role : roles) {
            if(roleName.equals(role.getRoleName())) //role eli nheb enfaskhou mawjoud wale
                return  true;
        }
        return false;
    }

    @Override
    public AppUser saveUser(String username, String password,
                            String contact, String firstName, String secondeName,
                            LocalDate birthday, String salaire,String managerName,Integer manager_id, String cin,
                            String rib, String adresse, String titre,LocalDate rejoint_time,Double cota,Double solde) {

        AppUser  user=appUserRepository.findByUsername(username);
        if(user!=null) throw new RuntimeException("User already exists");
        AppUser appUser=new AppUser();
        appUser.setUsername(username);
        appUser.setContact(contact);
        appUser.setFirstName(firstName);
        appUser.setSecondeName(secondeName);
        appUser.setPublicPassword(password);
        appUser.setPassword(bCryptPasswordEncoder.encode(password));
        appUser.setBirthday(birthday);
        appUser.setSalaire(salaire);
        appUser.setRib(rib);
        appUser.setCin(cin);
        appUser.setManager_id(manager_id);
        appUser.setManagerName(managerName);
        appUser.setAdresse(adresse);
        appUser.setTitre(titre);
        appUser.setRejoint_time(rejoint_time);
        appUser.setCota(cota);
        appUser.setSolde(solde);
        appUserRepository.save(appUser);
        addRoleToUser(username,"USER");
        return appUser;
    }
    @Override
    public AppRole save(AppRole role) {
        return appRoleRepository.save(role);
    }
    @Override
    public AppUser loadUserByUsername(String username) {
        AppUser user=appUserRepository.findByUsername(username);
        if(user.equals(null)) throw new RuntimeException("user doesn't exist");
        return user;
    }
    @Override
    public void addRoleToUser(String username, String rolename) {
        AppUser appUser=appUserRepository.findByUsername(username);
        AppRole appRole=appRoleRepository.findByRoleName(rolename);
        AppRole userRole=appRoleRepository.findByRoleName("USER");
        Collection<AppRole> roles=new ArrayList<>();
        roles.add(appRole);
        roles.add(userRole);
        appUser.setRoles(roles);
    }
    public void addNewRoleToUser(String username,String rolename){
        Collection<AppRole> roles=new ArrayList<>();
        roles = this.loadRolesByUsername(username);
        if (this.isHaveRole(roles,rolename)) throw new RuntimeException("user already have this role");
        this.addRoleToUser(username, rolename);
    }

    public boolean isHaveRole(Collection<AppRole> roles,String roleName){
        for (AppRole role : roles) {
            if(roleName.equals(role.getRoleName())) return true;
        }
        return false;
    }

    public void deleteUser(String username){
        if(username.equals("admin"))throw new RuntimeException("can't remove account of admin user");
        AppUser user=appUserRepository.findByUsername(username);
        if(user.equals(null)) throw new RuntimeException("user doesn't exist");
        this.appUserRepository.removeAppUserByUsername(username);
    }

    @Override
    public Collection<AppRole> loadRolesByUsername(String username) {
        Collection<AppRole> roles=new ArrayList<>();
        roles=this.loadUserByUsername(username).getRoles();
        return roles;
    }
    @Override
    public AppUser addAdminRole(String username){
        Collection<AppRole> roles=new ArrayList<>();
        roles = this.loadRolesByUsername(username);
        if (this.isAdmin(roles)) throw new RuntimeException("user is already ADMIN");
        this.addRoleToUser(username, "ADMIN");
        return this.loadUserByUsername(username);
    }

    public boolean isAdmin(Collection<AppRole> roles) {
        for (AppRole role : roles) {
            if("ADMIN".equals(role.getRoleName())) return  true;
        }
        return false;
    }

}
