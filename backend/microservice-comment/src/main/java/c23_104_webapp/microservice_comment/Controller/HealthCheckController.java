package c23_104_webapp.microservice_comment.Controller;

import c23_104_webapp.microservice_comment.Repositories.APIClient.UserAPIClient;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/health")
public class HealthCheckController {

    private final UserAPIClient userAPIClient;

    @GetMapping
    public String testCheck(){
        return userAPIClient.healthCheck();
    }
}