package org.sid.web;

import lombok.Data;
import org.sid.entities.AppUser;
import org.sid.entities.Comsuption;
import org.sid.service.BillingServcie;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;


@RestController
public class BillingController {
    @Autowired
    private BillingServcie billingServcie;
    @GetMapping("/Comsuption")
    public List<Comsuption> getAllItem(){
        return  billingServcie.getAllitem();
    }
    @GetMapping("/Comsuption/{id}")
    public Comsuption getItem(@PathVariable int id){
        return billingServcie.getItem(id);
    }
    @PostMapping("/Comsuption")
    public Comsuption saveItem(@RequestBody ItemForm ItemForm){
        Comsuption item=new Comsuption();
        item.setItemName(ItemForm.getItemName());
        item.setQuantity(ItemForm.getQuantity());
        item.setPrix(ItemForm.getPrix());
        item.setDate(ItemForm.getDate());
        return billingServcie.saveItem(item);
    }
    @DeleteMapping("/Comsuption/{id}")
    public void deletItem(@PathVariable int id){
         billingServcie.deleteItem(id);
    }

}
@Data
class ItemForm{
    public  String  itemName;
    public  String  quantity;
    public  String  prix;
    public LocalDate date;
}
