package c23_104_webapp.microservice_post.Controller.post;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/post")
public class PostController {

    @GetMapping
    public String healthCheck() {
        return "API is working in post";
    }
}
