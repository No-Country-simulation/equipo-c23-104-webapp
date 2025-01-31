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
}
