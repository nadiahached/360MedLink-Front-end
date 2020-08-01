package org.sid.dao;

import org.sid.entities.Conge;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;
@RepositoryRestResource
public interface CongeRepository extends JpaRepository<Conge,Integer> {
    List<Conge> findAll();
    List<Conge> findAllByStatus(String status);
    List<Conge> findAllByManagerId(int idManager);
    List<Conge> findAllByIdUserAndAndStatus(int id,String status);
    List<Conge> findAllByManagerIdAndRhApprouvment(int id ,int rhStatus);
    List<Conge> findAllByIdUser(int idUser);
    Conge findById(int id);
    List<Conge> findAllByRhApprouvment(int id);


}
