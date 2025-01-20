package c23_104_webapp.microservice_user.Util;

import java.util.Set;

public class Constants {

    private Constants() {
    }

    public static final Set<String> UNPROTECTED_PATHS = Set.of(
            "health",
            "api/users/register",
            "api/users/login",
            "api/auth/password-reset/send-otp",
            "api/auth/password-reset/verify-otp",
            "api/auth/password-reset",
            "api/profile/id/.*",
            "api/profile/email/.*",
            "api/profile/user/.*",
            "swagger-ui.html",
            "swagger-ui/.*",
            "v3/api-docs",
            "swagger.json/.*"
    );
}
