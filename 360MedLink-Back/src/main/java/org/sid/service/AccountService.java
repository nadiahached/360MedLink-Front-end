package org.sid.service;

import org.sid.entities.AppRole;
import org.sid.entities.AppUser;

import java.time.LocalDate;
import java.util.Collection;
import java.util.Date;

public interface AccountService {


    public AppUser deleteRole(String username,String roleName);
    public AppUser saveUser(String username, String password,
                            String contact, String firstName, String secondeName,
                            LocalDate birthday, String salaire,String managerName,Integer manager_id, String cin,
                            String rib, String adresse,String titre,LocalDate rejoint_time,Double cota,Double solde);

    public AppRole save(AppRole role);
    public AppUser loadUserByUsername(String username);
    public void addRoleToUser(String username,String rolename);
    public void addNewRoleToUser(String username,String rolename);
    public void deleteUser(String username);
    public Collection<AppRole> loadRolesByUsername(String username);
    public AppUser addAdminRole(String username);


}
