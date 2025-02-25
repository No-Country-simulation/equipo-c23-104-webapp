package c23_104_webapp.microservice_comment.Repositories.APIClient;

import c23_104_webapp.microservice_comment.DTO.response.authentication.UserDetailsDTO;
import c23_104_webapp.microservice_comment.DTO.response.customer.UserInfoResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@FeignClient(name = "microservice-user")
public interface UserAPIClient {

    @GetMapping("/api/users/check-blacklist")
    ResponseEntity<Boolean> checkBlacklist(@RequestHeader("Authorization") String authHeader);

    @GetMapping("/api/users/{username}")
    ResponseEntity<UserDetailsDTO> getUserDetails(@PathVariable("username") String username);

    @GetMapping("/api/profile/usersInfo")
    Page<UserInfoResponse> getUserInfoByIds(@RequestParam("userIds") List<Long> userIds, Pageable pageable);

    @GetMapping("/api/profile/user/{handleUsername}")
    UserInfoResponse getUserInfoByHandleUsername(@PathVariable("handleUsername") String handleUsername);

    @GetMapping("/health")
    String healthCheck();
}
