package c23_104_webapp.microservice_post.Repositories.APIClient;

import c23_104_webapp.microservice_post.DTO.response.authentication.UserDetailsDTO;
import jakarta.validation.constraints.NotBlank;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@FeignClient(name = "microservice-user")
public interface UserAPIClient {

    @GetMapping("/api/users/check-blacklist")
    ResponseEntity<Boolean> checkBlacklist(@RequestHeader("Authorization") String authHeader);

    @GetMapping("/api/users/{username}")
    ResponseEntity<UserDetailsDTO> getUserDetails(@PathVariable("username") String username);

    @GetMapping("/health")
    public String healthCheck();

    @PostMapping("/api/profile/join-community")
    void joinCommunity(@RequestBody @NotBlank String community);

    @PostMapping("/api/profile/leave-community")
    void leaveCommunity(@RequestBody @NotBlank String community);
}
