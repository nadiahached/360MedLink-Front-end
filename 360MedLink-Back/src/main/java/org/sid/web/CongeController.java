package org.sid.web;

import lombok.Data;
import org.sid.entities.Conge;
import org.sid.service.CongeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.NotEmpty;
import java.time.LocalDate;
import java.util.List;

@RestController
public class CongeController {
    @Autowired
    CongeService congeService;
    @GetMapping("/Conge/rh")
    public List<Conge> getRhConge(){
        return congeService.getNotApprouvedRhConge();
    }

    @PostMapping("/Conge/rh/{id}")
    public Conge rhApprouveConge(@PathVariable int id ){
        return congeService.ApprouveRH(id);
    }

    @GetMapping("/Conge/manager/{id}")
    public List<Conge> getManagerConge(@PathVariable int id){
        return congeService.getManagerConge(id);
    }

    @PostMapping("/Conge/manager/{congeid}/{userid}")
    public Conge managerApprouveConge(@PathVariable int congeid,@PathVariable int userid  ){
        return congeService.approuveManagerConge(congeid,userid);
    }

    @PostMapping("/Conge/bloc/manager/{id}")
    public Conge managerBlockConge(@PathVariable int id ){
        return congeService.blocManagerConge(id);
    }

    @DeleteMapping("/Conge/{id}")
    public void deleteConge(@PathVariable int id){
         congeService.deleteConge(id);
    }

    @PostMapping("/Conge")
    public Conge AddConge(@RequestBody CongeForm congeForm){
         Conge conge = new Conge(null,congeForm.getManagerName(),congeForm.getFirstName(),congeForm.getSecondeName()
                 ,congeForm.getTitre(),congeForm.getIdUser(),congeForm.getManager_id(), null,
                 congeForm.getBreJours(),"En attente",0);
         conge.setDebutTime( LocalDate.parse(congeForm.getDebutTime()).plusDays(1));
         return congeService.addConge(conge);
    }

    @GetMapping("/Conge/user/{id}")
    public List<Conge> getUserConge(@PathVariable int id){
        return congeService.getUserConge(id);
    }

}


@Data
class CongeForm{
    private String  managerName;
    private Integer idUser;
    private Integer manager_id;
    private String  debutTime;
    private Integer breJours;
    private String  firstName;
    private String  secondeName;
    private String  titre;
}
