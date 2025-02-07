package c23_104_webapp.microservice_post.Controller;

import c23_104_webapp.microservice_post.DTO.request.PostRequest;
import c23_104_webapp.microservice_post.DTO.response.GenericResponse;
import c23_104_webapp.microservice_post.DTO.response.customer.PostDTO;
import c23_104_webapp.microservice_post.Service.customer.PostService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
@RequestMapping("/api/post")
public class PostController {

    private final PostService postService;

    @GetMapping
    public String healthCheck() {
        return "API is working in post";
    }

    @PostMapping("/create")
    public ResponseEntity<GenericResponse> createPost(@RequestBody @Valid PostRequest postRequest) {
        postService.createPost(postRequest);
        return ResponseEntity.ok(new GenericResponse("Post created successfully"));
    }

    @GetMapping("/all")
    public ResponseEntity<Page<PostDTO>> getPosts(Pageable pageable){
        return ResponseEntity.ok(postService.getPosts(pageable));
    }

    @GetMapping("/community/{id}")
    public ResponseEntity<Page<PostDTO>> getPostsByCommunity(Pageable pageable,@PathVariable Long id){
        return ResponseEntity.ok(postService.getPostsByCommunity(pageable,id));
    }

    @GetMapping("/communities")
    public ResponseEntity<Page<PostDTO>>  getPostsByCommunity(
            @RequestParam List<String> name, Pageable pageable) {
        return ResponseEntity.ok(postService.getPostsByCommunityNames(name,pageable));
    }

    @GetMapping("/user/{username}")
    public ResponseEntity<Page<PostDTO>> getPostsByUser(Pageable pageable,@PathVariable String username){
        return ResponseEntity.ok(postService.getPostsByIdUser(pageable,username));
    }

    @GetMapping("/interactions/{username}")
    public ResponseEntity<Page<PostDTO>> findPostsWithUserInteraction(Pageable pageable,@PathVariable String username){
        return ResponseEntity.ok(postService.findPostsWithUserInteraction(pageable,username));
    }

    @GetMapping("/{id}")
    public ResponseEntity<PostDTO> findPostById(@PathVariable Long id){
        return ResponseEntity.ok(postService.findPostById(id));
    }

    @PatchMapping("/delete/{id}")
    public ResponseEntity<GenericResponse> deletePost(@PathVariable Long id){
        postService.deletePost(id);
        return ResponseEntity.ok(new GenericResponse("Post deleted"));
    }

}
