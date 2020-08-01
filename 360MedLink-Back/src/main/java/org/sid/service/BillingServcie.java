package org.sid.service;

import org.sid.dao.AppUserRepository;
import org.sid.dao.ComsuptionRepository;
import org.sid.entities.Comsuption;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class BillingServcie {
    @Autowired
    private ComsuptionRepository comsuptionRepository;

    public Comsuption saveItem(Comsuption item){
       return this.comsuptionRepository.save(item);
    }
    public void deleteItem(int itemId){
         this.comsuptionRepository.deleteById(itemId);
    }
    public Comsuption getItem(int itemId){
       return this.comsuptionRepository.findById(itemId);
    }
    public List<Comsuption> getAllitem(){
        return this.comsuptionRepository.findAll();
    }


}
