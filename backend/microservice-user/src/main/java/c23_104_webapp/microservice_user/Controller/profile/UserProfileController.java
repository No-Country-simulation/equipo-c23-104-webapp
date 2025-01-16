package c23_104_webapp.microservice_user.Controller.profile;

import c23_104_webapp.microservice_user.DTO.response.profile.UserInfoResponse;
import c23_104_webapp.microservice_user.Service.customer.UserService;
import jakarta.validation.constraints.Email;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/profile")
public class UserProfileController {

    private final UserService userService;

    @GetMapping("/user")
    public ResponseEntity<UserInfoResponse> getUserInfo() {
        return ResponseEntity.ok(userService.getLoggedInUserDetails());
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<UserInfoResponse> getUserInfo(@PathVariable @Email String email) {
        return ResponseEntity.ok(userService.getUserInfoByEmail(email));
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<UserInfoResponse> getUserInfoById(@PathVariable Long id){
        return ResponseEntity.ok(userService.getUserById(id));
    }
}
