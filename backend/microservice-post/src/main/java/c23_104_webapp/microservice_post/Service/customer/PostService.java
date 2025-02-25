package c23_104_webapp.microservice_post.Service.customer;

import c23_104_webapp.microservice_post.DTO.request.PostRequest;
import c23_104_webapp.microservice_post.DTO.response.customer.PostDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface PostService {
    void createPost(PostRequest postRequest);
    Page<PostDTO> getPosts(Pageable pageable);
    Page<PostDTO> getPostsByCommunity(Pageable pageable, Long communityId);
    Page<PostDTO> getPostsByCommunityNames(List<String> names, Pageable pageable);
    Page<PostDTO> getPostsByIdUser(Pageable pageable,String username);
    void deletePost(Long id);
    Page<PostDTO> findPostsWithUserInteraction(Pageable pageable,String username);
    PostDTO findPostById(Long id);
}
