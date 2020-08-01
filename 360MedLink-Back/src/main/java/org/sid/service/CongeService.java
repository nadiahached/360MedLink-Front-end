package org.sid.service;

import org.sid.dao.AppUserRepository;
import org.sid.dao.ComsuptionRepository;
import org.sid.dao.CongeRepository;
import org.sid.entities.AppRole;
import org.sid.entities.AppUser;
import org.sid.entities.Conge;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.Period;
import java.util.List;

@Service
@Transactional
public class CongeService {
    @Autowired
    private CongeRepository congeRepository;
    @Autowired
    private AppUserRepository appUserRepository;

    public Conge addConge(Conge conge){
       return congeRepository.save(conge);
    }
    public List<Conge> getUserConge(int userId){
        return congeRepository.findAllByIdUser(userId);
    }
    public void deleteConge(int id){
        congeRepository.deleteById(id);
    }
    public Conge ApprouveRH(int id){
        Conge conge= congeRepository.findById(id);
        conge.setRhApprouvment(1);
        conge.setDebutTime(conge.getDebutTime().plusDays(1));
        return  conge;
    }
    public List<Conge> getNotApprouvedRhConge(){
        return congeRepository.findAllByRhApprouvment(0);
    }
    public List<Conge> getManagerConge(int idManager){
        return congeRepository.findAllByManagerIdAndRhApprouvment(idManager,1);
    }
    public Conge approuveManagerConge(int id,int userid){
       Conge conge=congeRepository.findById(id);
       AppUser user = appUserRepository.findById(userid);
       int takenSolde =0;
       List<Conge> takenConges=congeRepository.findAllByIdUserAndAndStatus(userid,"Approuvé");
       for (Conge congeItem : takenConges) {
            takenSolde=takenSolde+congeItem.getBreJours();
       }
       takenSolde=takenSolde+conge.getBreJours();

       LocalDate rejointDate =user.getRejoint_time().plusDays(1);

       LocalDate now =LocalDate.now().plusDays(1);

       Period duration = Period.between(rejointDate, now);

       Double solde = ((duration.getYears()*12+ duration.getMonths())*user.getCota())-takenSolde;
       user.setSolde(solde);
       conge.setStatus("Approuvé");
       conge.setDebutTime(conge.getDebutTime().plusDays(1));
       return conge;
    }
    public Conge blocManagerConge(int id){
        Conge conge=congeRepository.findById(id);
        conge.setStatus("Annulé");
        conge.setDebutTime(conge.getDebutTime().plusDays(1));
        return conge;
    }






}
