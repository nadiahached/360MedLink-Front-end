package org.sid;

import org.sid.entities.AppRole;
import org.sid.entities.AppUser;
import org.sid.entities.Salary;
import org.sid.service.AccountService;
import org.sid.service.SalaryService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.text.SimpleDateFormat;
import java.time.Duration;
import java.time.LocalDate;
import java.time.Period;
import java.util.Date;
import java.util.stream.Stream;

@SpringBootApplication
public class SecServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(SecServiceApplication.class, args);
    }
    @Bean
    BCryptPasswordEncoder getBCPE(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    CommandLineRunner start(AccountService accountService, SalaryService salaryService){
        return args->{
            LocalDate date =LocalDate.parse("2016-06-01").plusDays(1);
            LocalDate d1 =LocalDate.parse("2016-07-01").plusDays(1);
            LocalDate d2 =LocalDate.parse("2016-08-01").plusDays(1);
            LocalDate d3=LocalDate.parse("2016-09-01").plusDays(1);
            LocalDate d4 =LocalDate.parse("2016-10-01").plusDays(1);

            LocalDate rejointDate =LocalDate.parse("2019-01-01").plusDays(1);
            LocalDate d22 =LocalDate.now().plusDays(1);

            Period duration = Period.between(rejointDate, d22);

            Double solde = (duration.getYears()*12+ duration.getMonths())*1.5;

            accountService.save(new AppRole(null,"USER"));
            accountService.save(new AppRole(null,"ADMIN"));
            accountService.save(new AppRole(null,"RH"));
            accountService.save(new AppRole(null,"MANAGER"));

            accountService.saveUser("rim@gmail.com","1234", "12345678","Rim",
                    "Louati",date,"1200",null,null,"07496812","0000",
                    "Ghazela Technopole","MANAGER",rejointDate,1.5,solde);

            AppUser fictivemanager=accountService.loadUserByUsername("rim@gmail.com");

            accountService.saveUser("selim@gmail.com","1234", "12345678","Selim",
                    "Hached",date,"3600",fictivemanager.getFirstName(),fictivemanager.getId(),
                    "07496812","0000", "Ariana","MANAGER",rejointDate,1.5,solde);

            AppUser manager=accountService.loadUserByUsername("selim@gmail.com");

            accountService.saveUser("fatma@gmail.com","1234", "12345678","Fatma",
                    "Gaaloul",date,"900",manager.getFirstName(),manager.getId(),"07496812","0000",
                    "Ghazela","RH",rejointDate,1.5,solde);

            accountService.saveUser("nadia@gmail.com","1234", "12345678","Nadia",
                    "Hached",date,"1800",manager.getFirstName(),manager.getId(),"07496812","0000",
                    "Ghazela","USER",rejointDate,1.5,solde);

            accountService.saveUser("admin@gmail.com","1234", "12345678","Amir",
                    "Belhaj",date,"2000",manager.getFirstName(),manager.getId(),"07496812","0000",
                    "Tunis","ADMIN",rejointDate,1.5,solde);


            accountService.addRoleToUser("admin@gmail.com","ADMIN");
            accountService.addNewRoleToUser("rim@gmail.com","MANAGER");
            accountService.addNewRoleToUser("selim@gmail.com","MANAGER");
            accountService.addNewRoleToUser("fatma@gmail.com","RH");
            Salary sal3 = new Salary(null,2,"MANAGER","3600",d3);
            Salary sal1 = new Salary(null,2,"MANAGER","3600",d1);
            Salary sal2 = new Salary(null,2,"MANAGER","3600",d2);
            Salary sal4 = new Salary(null,2,"MANAGER","3600",d4);
            salaryService.AddSalary(sal3);
            salaryService.AddSalary(sal1);
            salaryService.AddSalary(sal2);
            salaryService.AddSalary(sal4);
        };
    }

}

