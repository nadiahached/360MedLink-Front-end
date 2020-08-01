package org.sid.dao;

import org.sid.entities.AppUser;
import org.sid.entities.Salary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

import java.time.LocalTime;
import java.util.Collection;
import java.util.List;

@RepositoryRestResource
public interface SalaryRepository extends JpaRepository<Salary,Integer> {
      List<Salary> findByIduserOrderByDate(int id);

}
