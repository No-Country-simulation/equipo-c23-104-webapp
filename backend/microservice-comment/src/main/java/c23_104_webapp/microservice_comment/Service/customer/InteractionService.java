package c23_104_webapp.microservice_comment.Service.customer;

import c23_104_webapp.microservice_comment.DTO.response.customer.UserInfoResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface InteractionService {
    void createInteraction(Long idComment);
    Page<UserInfoResponse> getInteractionsByComment(Long id, Pageable pageable);
}
