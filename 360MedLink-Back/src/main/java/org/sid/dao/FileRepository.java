package org.sid.dao;

import org.sid.entities.File;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FileRepository extends JpaRepository<File, Integer> {
    File findById(int id);
}
