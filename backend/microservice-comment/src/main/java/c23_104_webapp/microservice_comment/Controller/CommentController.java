package c23_104_webapp.microservice_comment.Controller;

import c23_104_webapp.microservice_comment.DTO.GenericResponse;
import c23_104_webapp.microservice_comment.DTO.request.CommentRequest;
import c23_104_webapp.microservice_comment.DTO.response.customer.CommentResponse;
import c23_104_webapp.microservice_comment.Service.customer.CommentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/comment")
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PATCH, RequestMethod.PUT, RequestMethod.DELETE})
public class CommentController {

    private final CommentService commentService;

    @PostMapping("/create")
    public ResponseEntity<GenericResponse> createComment(@RequestBody @Valid CommentRequest commentRequest){
        commentService.createComment(commentRequest);
        return ResponseEntity.ok(new GenericResponse("Comment created"));
    }

    @GetMapping("/post/{id}")
    public ResponseEntity<Page<CommentResponse>> getCommentsByPost(@PathVariable Long id, Pageable pageable){
        return ResponseEntity.ok(commentService.getCommentsByPost(pageable,id));
    }

    @GetMapping("/interactions/{username}")
    public ResponseEntity<Page<CommentResponse>> findCommentsWithUserInteraction(@PathVariable String username,Pageable pageable){
        return ResponseEntity.ok(commentService.findCommentsWithUserInteraction(pageable,username));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Page<CommentResponse>> findCommentByIdAndReplies(@PathVariable Long id, Pageable pageable){
        return ResponseEntity.ok(commentService.findCommentByIdAndReplies(pageable,id));
    }

    @PatchMapping("/delete/{id}")
    public ResponseEntity<GenericResponse> deleteComment(@PathVariable Long id){
        commentService.deleteComment(id);
        return ResponseEntity.ok(new GenericResponse("Comment deleted"));
    }
}
