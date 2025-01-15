package c23_104_webapp.microservice_user.DTO.request.authentication;


import c23_104_webapp.microservice_user.Util.Password;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record ResetPasswordRequest(@NotBlank @Email String identifier,
                                   @NotBlank String resetToken,
                                   @Password String newPassword) {
}