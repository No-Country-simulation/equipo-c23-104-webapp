package c23_104_webapp.microservice_post.Repositories.APIClient;

import c23_104_webapp.microservice_post.DTO.response.authentication.UserDetailsDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;

@FeignClient(name = "microservice-user")
public interface UserAPIClient {

    @GetMapping("/api/users/check-blacklist")
    ResponseEntity<Boolean> checkBlacklist(@RequestHeader("Authorization") String authHeader);

    @GetMapping("/api/users/{username}")
    ResponseEntity<UserDetailsDTO> getUserDetails(@PathVariable("username") String username);

    @GetMapping("/health")
    public String healthCheck();
}
