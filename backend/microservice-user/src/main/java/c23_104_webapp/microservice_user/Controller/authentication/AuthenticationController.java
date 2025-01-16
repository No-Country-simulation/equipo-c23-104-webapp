package c23_104_webapp.microservice_user.Controller.authentication;

import c23_104_webapp.microservice_user.DTO.request.authentication.LoginRequest;
import c23_104_webapp.microservice_user.DTO.request.authentication.UserRegisterRequest;
import c23_104_webapp.microservice_user.DTO.response.profile.UserDetailsResponse;
import c23_104_webapp.microservice_user.Entities.Token;
import c23_104_webapp.microservice_user.Service.authentication.AuthenticationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users")
public class AuthenticationController {

    private final AuthenticationService authenticationService;

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
}
