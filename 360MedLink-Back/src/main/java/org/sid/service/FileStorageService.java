package org.sid.service;

import org.sid.dao.FileRepository;
import org.sid.entities.File;
import org.sid.entities.File_Payload;
import org.sid.exception.FileStorageException;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.transaction.annotation.Transactional;
import java.io.IOException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Validated
@Service
@Transactional
public class FileStorageService {

    private FileRepository fileRepository;

    public FileStorageService(FileRepository fileRepository){
        this.fileRepository=fileRepository;
    }
    public File storeFile(String  date, MultipartFile data) {

        String fileStruct = StringUtils.cleanPath(data.getOriginalFilename());

        try {
            if(fileStruct.contains("..")) {
                throw new FileStorageException("Sorry! File contains invalid path sequence " + fileStruct);
            }


            // on save le fichier dans la base de donnnées
            LocalDate creation =LocalDate.parse(date).plusDays(1);

            File fileToSave=new File();
            fileToSave.setDate(creation);
            fileToSave.setData(data.getBytes());
            fileRepository.save(fileToSave);



            return fileToSave ;
        } catch (IOException ex) {
            throw new FileStorageException("Could not store file, Please try again!", ex);
        }
    }

    public File getFile(int fileId) {
        File file=fileRepository.findById(fileId);
        if(!(file!=null))throw new RuntimeException("File not found with id " + fileId);
        return file;
    }



    public void delete(int fileId){
        File file=fileRepository.findById(fileId);
        if(!(file!=null))throw new RuntimeException("File not found with id " + fileId);
        fileRepository.deleteById(fileId);
    }

    public List<File_Payload> getAllFiles(){
          List<File> files =fileRepository.findAll();
          List<File_Payload> payload =new ArrayList<>();
          files.forEach(file -> {
                     payload.add(new File_Payload(file.getId(),file.getDate()));
          });
          return payload;
    }
}
