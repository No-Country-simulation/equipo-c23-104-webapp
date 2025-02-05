package c23_104_webapp.microservice_user.DTO.request.authentication;

import c23_104_webapp.microservice_user.Util.Password;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record UserRegisterRequest(@NotBlank String name,
                                  @Password String password,
                                  @NotBlank @Email(message = "Invalid email: ${validatedValue}") String email,
                                  @NotBlank String username) {
}
