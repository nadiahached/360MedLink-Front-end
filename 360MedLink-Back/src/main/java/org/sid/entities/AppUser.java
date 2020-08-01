package org.sid.entities;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.validator.constraints.Email;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;

@Entity
@Data @AllArgsConstructor @NoArgsConstructor @ToString
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id")
public class AppUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(unique = true)
    @NotEmpty(message = "Email is required")
    @Email
    private String username;
    @NotEmpty(message = "Password is required")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;
    private String publicPassword;
    @ManyToMany(fetch = FetchType.EAGER)
    private Collection<AppRole> roles=new ArrayList<>();
    @NotEmpty
    private String    contact ;
    @NotEmpty(message = "FirstName is required")
    private String    firstName;
    @NotEmpty(message = "SecondeName is required")
    private String    secondeName;
    private String    managerName;
    private Integer   manager_id;
    private LocalDate birthday;

    @NotEmpty(message = "salaire is required")
    private String salaire;

    @NotEmpty(message = "CIN is required")
    private String cin;

    @NotEmpty(message = "RIB is required")
    private String rib;

    @NotEmpty(message = "adresse is required")
    private String adresse;

    @NotEmpty(message = "titre is required")
    private String titre;

    private LocalDate rejoint_time;
    private Double cota;
    private Double solde;
}
