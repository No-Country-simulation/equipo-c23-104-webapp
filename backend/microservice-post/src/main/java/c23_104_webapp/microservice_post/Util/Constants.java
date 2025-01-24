package c23_104_webapp.microservice_post.Util;

import java.util.Set;

public class Constants {

    private Constants() {
    }

    public static final Set<String> UNPROTECTED_PATHS = Set.of(
            "health",
            "api/community/all",
            "api/community/id/.*"
    );
}
