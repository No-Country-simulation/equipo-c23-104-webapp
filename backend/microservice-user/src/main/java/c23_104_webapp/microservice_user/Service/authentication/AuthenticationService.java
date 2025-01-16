package c23_104_webapp.microservice_user.Service.authentication;

import c23_104_webapp.microservice_user.DTO.request.authentication.LoginRequest;
import c23_104_webapp.microservice_user.DTO.request.authentication.UserRegisterRequest;
import c23_104_webapp.microservice_user.DTO.response.profile.UserDetailsResponse;
import c23_104_webapp.microservice_user.Entities.Token;

public interface AuthenticationService {
    UserDetailsResponse registerUser(UserRegisterRequest userRegisterRequest);
    Token login(LoginRequest loginRequest);
    void logout(String token);
}
