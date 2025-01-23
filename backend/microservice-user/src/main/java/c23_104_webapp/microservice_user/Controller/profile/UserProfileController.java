package c23_104_webapp.microservice_user.Controller.profile;

import c23_104_webapp.microservice_user.DTO.request.profile.EditProfileRequest;
import c23_104_webapp.microservice_user.DTO.response.profile.UserInfoResponse;
import c23_104_webapp.microservice_user.Service.customer.UserService;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<UserInfoResponse> getUserInfoByEmail(@PathVariable @Email String email) {
        return ResponseEntity.ok(userService.getUserInfoByEmail(email));
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<UserInfoResponse> getUserInfoById(@PathVariable Long id){
        return ResponseEntity.ok(userService.getUserById(id));
    }

    @GetMapping("/user/{handleUsername}")
    public ResponseEntity<UserInfoResponse> getUserInfoByHandleUsername(@PathVariable String handleUsername) {
        return ResponseEntity.ok(userService.getUserInfoByHandleUsername(handleUsername));
    }

    @PatchMapping("/edit")
    public ResponseEntity<UserInfoResponse> editUserProfile(@RequestBody EditProfileRequest editProfileRequest){
        return ResponseEntity.ok(userService.editUserProfile(editProfileRequest));
    }

    @PatchMapping("/join-community")
    public ResponseEntity<UserInfoResponse> joinCommunity(@RequestBody @NotBlank String community){
        return ResponseEntity.ok(userService.joinCommunity(community));
    }

}
