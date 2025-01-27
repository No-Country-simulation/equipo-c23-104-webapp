package c23_104_webapp.microservice_post.Service.customer;

import c23_104_webapp.microservice_post.DTO.request.PostRequest;
import c23_104_webapp.microservice_post.DTO.response.customer.PostDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface PostService {
    void createPost(PostRequest postRequest);
    Page<PostDTO> getPosts(Pageable pageable);
    Page<PostDTO> getPostsByCommunity(Pageable pageable, Long communityId);
    Page<PostDTO> getPostsByCommunityNames(List<String> names, Pageable pageable);
    Page<PostDTO> getPostsByIdUser(Pageable pageable);
}
