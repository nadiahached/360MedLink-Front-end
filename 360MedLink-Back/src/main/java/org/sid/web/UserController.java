package org.sid.web;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.sid.dao.AppUserRepository;
import org.sid.entities.AppUser;
import org.sid.sec.SecurityParams;
import org.sid.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
public class UserController {
    @Autowired
    private AccountService accountService;

    @Autowired
    private AppUserRepository appUserRepository;

    @PostMapping("/users/access/{username}/{roleName}")
    public void addRoleToUser(@PathVariable String username,@PathVariable String roleName) {
         accountService.addNewRoleToUser(username,roleName);
    }
    @DeleteMapping("/users/access/{username}/{roleName}")
    public AppUser deleteRoleToUser(@PathVariable String username,@PathVariable String roleName) {
       return accountService.deleteRole(username,roleName);
    }


    @GetMapping("/profile")
    public AppUser getProfile(HttpServletRequest request) {
        String username =this.getRequestUsername(request);
        return accountService.loadUserByUsername(username);
    }

    @DeleteMapping("profile")
    public void deleteMyAccount(HttpServletRequest request){
        String username =this.getRequestUsername(request);
        accountService.deleteUser(username);
    }
    @GetMapping("/users")
    public List<AppUser> listUsers() { return appUserRepository.findAll();
    }
    @GetMapping("/user/{id}")
    public AppUser getSingleUser(@PathVariable int id) { return appUserRepository.findById(id);
    }


    public String getRequestUsername(HttpServletRequest request){
        String jwtToken = request.getHeader(SecurityParams.JWT_HEADER_NAME);
        JWTVerifier verifier = JWT.require(Algorithm.HMAC256(SecurityParams.SECRET)).build();
        String jwt = jwtToken.substring(SecurityParams.HEADER_PREFIX.length());
        DecodedJWT decodedJWT = verifier.verify(jwt);
        String TokenUsername = decodedJWT.getSubject();
        System.out.println(TokenUsername);
        return TokenUsername;
}
}

















