package c23_104_webapp.microservice_user.Controller.authentication;

import c23_104_webapp.microservice_user.DTO.request.authentication.OtpRequest;
import c23_104_webapp.microservice_user.DTO.request.authentication.ResetPasswordRequest;
import c23_104_webapp.microservice_user.DTO.request.authentication.ResetTokenRequest;
import c23_104_webapp.microservice_user.DTO.response.GenericResponse;
import c23_104_webapp.microservice_user.DTO.response.authentication.ResetTokenResponse;
import c23_104_webapp.microservice_user.Service.authentication.PasswordResetService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/auth/password-reset")
@RequiredArgsConstructor
public class PasswordResetController {

    private final PasswordResetService passwordResetService;

    @PostMapping("/send-otp")
    public ResponseEntity<GenericResponse> sendOtp(@RequestBody @Valid OtpRequest otpRequest) {
        passwordResetService.sendOtp(otpRequest.identifier());

        String successMessage = "OTP sent successfully to: " + otpRequest.identifier();
        return ResponseEntity.ok(new GenericResponse(successMessage));
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<ResetTokenResponse> getResetToken(@Valid @RequestBody ResetTokenRequest otpRequest) {

        return ResponseEntity.ok(passwordResetService.getResetToken(otpRequest));
    }

    @PostMapping
    public ResponseEntity<GenericResponse> resetPassword(@Valid @RequestBody ResetPasswordRequest resetPasswordRequest) {

        passwordResetService.resetPassword(resetPasswordRequest);
        return ResponseEntity.ok(new GenericResponse("Password reset successfully"));
    }
}
