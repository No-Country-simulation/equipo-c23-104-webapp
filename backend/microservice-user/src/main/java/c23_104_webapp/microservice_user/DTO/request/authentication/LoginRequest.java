package c23_104_webapp.microservice_user.DTO.request.authentication;

import c23_104_webapp.microservice_user.Util.Password;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record LoginRequest(@NotBlank @Email String identifier,
                           @Password String password) {
}
