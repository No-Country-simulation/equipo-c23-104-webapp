package c23_104_webapp.microservice_user.Service.authentication.Impl;

import c23_104_webapp.microservice_user.DTO.request.authentication.LoginRequest;
import c23_104_webapp.microservice_user.DTO.request.authentication.UserRegisterRequest;
import c23_104_webapp.microservice_user.DTO.response.profile.UserDetailsResponse;
import c23_104_webapp.microservice_user.Entities.Token;
import c23_104_webapp.microservice_user.Entities.User;
import c23_104_webapp.microservice_user.Exception.ApiException;
import c23_104_webapp.microservice_user.Repositories.UserRepository;
import c23_104_webapp.microservice_user.Security.JWTBlacklistManager;
import c23_104_webapp.microservice_user.Service.authentication.AuthenticationService;
import c23_104_webapp.microservice_user.Service.authentication.TokenService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final TokenService tokenService;;
    private final JWTBlacklistManager jwtBlacklistManager;

    @Override
    public UserDetailsResponse registerUser(UserRegisterRequest userRegisterRequest) {

        validateEmail(userRegisterRequest);

        String encodedPassword = passwordEncoder.encode(userRegisterRequest.password());

        User user = User.builder()
                .name(userRegisterRequest.name())
                .email(userRegisterRequest.email())
                .password(encodedPassword)
                .build();

        userRepository.save(user);

        return createUserResponse(
                userRegisterRequest,
                encodedPassword
        );
    }

    private void validateEmail(UserRegisterRequest userRegisterRequest) {
        if (userRepository.existsByEmailIgnoreCase(userRegisterRequest.email())) {
            throw new ApiException("Email already exists", HttpStatus.BAD_REQUEST);
        }
    }

    private UserDetailsResponse createUserResponse(UserRegisterRequest userRegisterRequest,
                                                   String encodedPassword) {

        return new UserDetailsResponse(
                userRegisterRequest.name(),
                userRegisterRequest.email(),
                encodedPassword
        );
    }

    @Override
    public Token login(LoginRequest loginRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.identifier(), loginRequest.password()));

            User userDetails = (User) authentication.getPrincipal();

            String token = tokenService.generateToken(userDetails);

            return new Token(token);

        } catch (BadCredentialsException e) {
            throw new ApiException("Bad credentials", HttpStatus.UNAUTHORIZED);
        }
    }

    @Override
    public void logout(String token) {
        jwtBlacklistManager.addTokenToBlackList(token);
    }
}
