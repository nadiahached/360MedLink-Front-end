package org.sid.dao;

import org.sid.entities.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource
public interface AppUserRepository extends JpaRepository<AppUser,Integer> {
    public AppUser findByUsername(String username);
    public List<AppUser> findByTitre(String titre);
    public List<AppUser> findByManagerName(String name);
    void removeAppUserByUsername(String username);
    AppUser findById(int id);
    public List<AppUser> findByFirstName(String firstName);
    void deleteById(int id);



}
