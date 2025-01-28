package c23_104_webapp.microservice_post.Service.customer;

import c23_104_webapp.microservice_post.DTO.response.customer.UserInfoResponse;
import org.springframework.data.domain.Page;

public interface InteractionService {
    void createInteraction(Long idPost);
    Page<UserInfoResponse> getInteractionsByPost(Long id);
}
