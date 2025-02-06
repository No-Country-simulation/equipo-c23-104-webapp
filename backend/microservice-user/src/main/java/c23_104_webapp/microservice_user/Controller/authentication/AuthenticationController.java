package c23_104_webapp.microservice_user.Controller.authentication;

import c23_104_webapp.microservice_user.DTO.request.authentication.LoginRequest;
import c23_104_webapp.microservice_user.DTO.request.authentication.UserRegisterRequest;
import c23_104_webapp.microservice_user.DTO.response.profile.UserDetailsResponse;
import c23_104_webapp.microservice_user.Entities.Token;
import c23_104_webapp.microservice_user.Security.JWTBlacklistManager;
import c23_104_webapp.microservice_user.Service.authentication.AuthenticationService;
import c23_104_webapp.microservice_user.Service.customer.Impl.UserServiceImpl;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
@RequestMapping("/api/users")
public class AuthenticationController {

    private final AuthenticationService authenticationService;
    private final JWTBlacklistManager jwtBlacklistManager;
    private final UserServiceImpl userService;

    @PostMapping("/register")
    public ResponseEntity<UserDetailsResponse> registerUser(@RequestBody @Valid
                                                            UserRegisterRequest userRegisterRequest) {
        return ResponseEntity.ok(authenticationService.registerUser(userRegisterRequest));
    }

    @PostMapping("/login")
    public ResponseEntity<Token> login(@RequestBody @Valid
                                       LoginRequest loginRequest) {


        return ResponseEntity.ok(authenticationService.login(loginRequest));
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(@RequestHeader(HttpHeaders.AUTHORIZATION)
                                       String authorization) {

        authenticationService.logout(authorization);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/check-blacklist")
    public ResponseEntity<Boolean> checkBlacklist(@RequestHeader("Authorization") String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.badRequest().body(false);
        }
        String token = authHeader.substring(7);

        return ResponseEntity.ok(jwtBlacklistManager.isBlackListed(token));
    }

    @GetMapping("/{username}")
    public ResponseEntity<UserDetails> getUserDetails(@PathVariable @Email String username){
        return ResponseEntity.ok(userService.loadUserByUsername(username));
    }
}
