package c23_104_webapp.microservice_comment.Service.customer;

import c23_104_webapp.microservice_comment.DTO.request.CommentRequest;
import c23_104_webapp.microservice_comment.DTO.response.customer.CommentResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface CommentService {
    void createComment(CommentRequest commentRequest);
    Page<CommentResponse> getCommentsByPost(Pageable pageable,Long idPost);
    Page<CommentResponse> findCommentsWithUserInteraction(Pageable pageable,String username);
}
