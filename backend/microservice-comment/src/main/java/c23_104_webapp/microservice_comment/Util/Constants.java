package c23_104_webapp.microservice_comment.Util;

import java.util.Set;

public class Constants {

    private Constants() {
    }

    public static final Set<String> UNPROTECTED_PATHS = Set.of(
            "health",
            "swagger-ui.html",
            "swagger-ui/.*",
            "v3/api-docs",
            "swagger.json/.*"
    );
}

