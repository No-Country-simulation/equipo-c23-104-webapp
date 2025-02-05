package c23_104_webapp.microservice_user.Service.authentication;

import c23_104_webapp.microservice_user.DTO.request.authentication.ResetPasswordRequest;
import c23_104_webapp.microservice_user.DTO.request.authentication.ResetTokenRequest;
import c23_104_webapp.microservice_user.DTO.response.authentication.ResetTokenResponse;

public interface PasswordResetService {
    void sendOtp(String email);
    ResetTokenResponse getResetToken(ResetTokenRequest resetTokenRequest);
    void resetPassword(ResetPasswordRequest resetPasswordRequest);
}
