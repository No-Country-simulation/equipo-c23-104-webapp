package c23_104_webapp.microservice_user.DTO.request.authentication;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record OtpRequest(@NotBlank @Email String identifier) {
}
