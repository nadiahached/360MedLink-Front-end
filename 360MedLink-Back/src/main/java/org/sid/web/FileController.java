package org.sid.web;

import org.sid.dao.FileRepository;
import org.sid.entities.File;
import org.sid.entities.File_Payload;
import org.sid.service.FileStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.List;

@Validated
@RestController
public class FileController {


    @Autowired
    private FileStorageService FileStorageService;
    @Autowired
    FileRepository fileRepository;

    @PostMapping(value = "/files" )
    public void uploadFile(@RequestParam("file") MultipartFile data,
                           @RequestParam("date") String date) {

        File File = FileStorageService.storeFile( date , data);
    }

    @GetMapping("/files")
    public  List<File_Payload> downloadAllFile() {
        List<File_Payload> files =FileStorageService.getAllFiles() ;
        return files;
    }

    @GetMapping("/files/{id}")
    public File downloadFile(@PathVariable(name = "id") int id)     {
        File File = FileStorageService.getFile(id);
        return File;
    }
    @DeleteMapping("/files/{id}")
    public void deleteFile(@PathVariable(name = "id") int id) {
        FileStorageService.delete(id);
    }


}
