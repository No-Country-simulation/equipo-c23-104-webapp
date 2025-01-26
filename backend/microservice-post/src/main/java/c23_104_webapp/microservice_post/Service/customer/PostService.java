package c23_104_webapp.microservice_post.Service.customer;

import c23_104_webapp.microservice_post.DTO.request.PostRequest;
import c23_104_webapp.microservice_post.DTO.response.customer.PostDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface PostService {
    void createPost(PostRequest postRequest);
    Page<PostDTO> getPosts(Pageable pageable);
}
