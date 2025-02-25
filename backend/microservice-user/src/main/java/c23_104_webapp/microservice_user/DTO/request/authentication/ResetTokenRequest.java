package c23_104_webapp.microservice_user.DTO.request.authentication;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public record ResetTokenRequest (@NotBlank @Email String identifier,
                                 @NotBlank @Pattern(regexp = "\\d{6}") String otp){
}
