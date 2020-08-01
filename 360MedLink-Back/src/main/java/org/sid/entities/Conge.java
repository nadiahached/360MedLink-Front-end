package org.sid.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotEmpty;
import java.time.LocalDate;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Conge {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @NotEmpty(message = "managerName is required")
    private String    managerName;
    @NotEmpty(message = "firstName is required")
    private String    firstName;
    @NotEmpty(message = "SecondeName is required")
    private String    secondeName;
    @NotEmpty(message = "titre is required")
    private String    titre;
    private Integer   idUser;
    private Integer   managerId;
    private LocalDate debutTime;
    private Integer   breJours;
    private String    status;
    private Integer   rhApprouvment;

}
