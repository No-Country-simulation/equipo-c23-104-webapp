package c23_104_webapp.microservice_post.Service.customer.Impl;

import c23_104_webapp.microservice_post.DTO.request.PostRequest;
import c23_104_webapp.microservice_post.DTO.response.customer.PostDTO;
import c23_104_webapp.microservice_post.DTO.response.customer.UserInfoResponse;
import c23_104_webapp.microservice_post.Entities.Post;
import c23_104_webapp.microservice_post.Exception.ApiException;
import c23_104_webapp.microservice_post.Repositories.APIClient.UserAPIClient;
import c23_104_webapp.microservice_post.Repositories.CommunityRepository;
import c23_104_webapp.microservice_post.Repositories.PostRepository;
import c23_104_webapp.microservice_post.Security.UserContext;
import c23_104_webapp.microservice_post.Service.customer.PostService;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class PostServiceImpl implements PostService {

    private final PostRepository postRepository;
    private final UserContext userContext;
    private final UserAPIClient userAPIClient;
    private final CommunityRepository communityRepository;


    @Override
    @Transactional
    public void createPost(PostRequest postRequest) {
        Long idUser = this.getUserIdFromUserLogged();

        boolean isUserInCommunity = communityRepository.isUserInCommunity(postRequest.community().getId(), idUser);

        if(isUserInCommunity){
            Post post = buildPost(idUser,postRequest);
            postRepository.save(post);
        } else {
            throw new ApiException("The user does not belong to the community, enters the community to be able to post", HttpStatus.BAD_REQUEST);
        }

    }

    @Override
    @CircuitBreaker(name = "microservice-user", fallbackMethod = "fallbackGetPosts")
    public Page<PostDTO> getPosts(Pageable pageable) {
        Page<Post> postsPage = postRepository.findAll(pageable);

        Page<Post> filteredPostsPage = filterDeletedPosts(postsPage);

        Set<Long> userIds = postsPage.getContent().stream()
                .map(Post::getIdUser)
                .collect(Collectors.toSet());

        List<UserInfoResponse> userInfoList = userAPIClient.getUserInfoByIds(new ArrayList<>(userIds));

        List<PostDTO> postDTOS = this.buildPostDTOsFromPosts(filteredPostsPage, userInfoList);

        return new PageImpl<>(postDTOS, pageable, filteredPostsPage.getTotalElements());
    }

    @Override
    @CircuitBreaker(name = "microservice-user", fallbackMethod = "fallbackGetPosts")
    public Page<PostDTO> getPostsByCommunity(Pageable pageable,Long communityId) {
        Page<Post> postsPage = postRepository.findByCommunityIdAndIsDeletedFalse(communityId,pageable);

        Set<Long> userIds = postsPage.getContent().stream()
                .map(Post::getIdUser)
                .collect(Collectors.toSet());

        List<UserInfoResponse> userInfoList = userAPIClient.getUserInfoByIds(new ArrayList<>(userIds));

        List<PostDTO> postDTOS = this.buildPostDTOsFromPosts(postsPage,userInfoList);

        return new PageImpl<>(postDTOS, pageable, postsPage.getTotalElements());
    }

    @Override
    @CircuitBreaker(name = "microservice-user", fallbackMethod = "fallbackGetPosts")
    public Page<PostDTO> getPostsByCommunityNames(List<String> names, Pageable pageable) {
        Page<Post> postsPage = postRepository.findByCommunityNameInAndIsDeletedFalse(names,pageable);

        Set<Long> userIds = postsPage.getContent().stream()
                .map(Post::getIdUser)
                .collect(Collectors.toSet());

        List<UserInfoResponse> userInfoList = userAPIClient.getUserInfoByIds(new ArrayList<>(userIds));

        List<PostDTO> postDTOS = this.buildPostDTOsFromPosts(postsPage,userInfoList);

        return new PageImpl<>(postDTOS, pageable, postsPage.getTotalElements());
    }

    @Override
    @CircuitBreaker(name = "microservice-user", fallbackMethod = "fallbackGetPosts")
    public Page<PostDTO> getPostsByIdUser(Pageable pageable,String username) {
        UserInfoResponse userInfoResponse = userAPIClient.getUserInfoByHandleUsername(username);

        Page<Post> postsPage = postRepository.findByIdUserAndIsDeletedFalse(userInfoResponse.id(),pageable);
        List<PostDTO> postDTOS = new ArrayList<>();

        for(Post post:postsPage){
            postDTOS.add(PostDTO.fromPost(post,userInfoResponse));
        }

        return new PageImpl<>(postDTOS, pageable, postsPage.getTotalElements());
    }

    @Override
    @Transactional
    public void deletePost(Long id) {
        Long idUser = this.getUserIdFromUserLogged();
        Optional<Post> post = postRepository.findByIdAndIdUserAndIsDeletedFalse(id,idUser);

        if(post.isPresent()){
            Post existingPost = post.get();
            existingPost.setIsDeleted(true);
            postRepository.save(existingPost);
        } else {
            throw new ApiException("Post not found or not belonging to the user",HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    @CircuitBreaker(name = "microservice-user", fallbackMethod = "fallbackGetPosts")
    public Page<PostDTO> findPostsWithUserInteraction(Pageable pageable,String username) {
        UserInfoResponse userInfoResponse = userAPIClient.getUserInfoByHandleUsername(username);

        Page<Post> postsPage  = postRepository.findPostsWithUserInteraction(userInfoResponse.id(),pageable);

        Set<Long> userIds = postsPage.getContent().stream()
                .map(Post::getIdUser)
                .collect(Collectors.toSet());

        List<UserInfoResponse> userInfoList = userAPIClient.getUserInfoByIds(new ArrayList<>(userIds));

        List<PostDTO> postDTOS = this.buildPostDTOsFromPosts(postsPage,userInfoList);

        return new PageImpl<>(postDTOS, pageable, postsPage.getTotalElements());

    }

    public Page<PostDTO> fallbackGetPosts(Pageable pageable, Throwable t) {
        return new PageImpl<>(new ArrayList<>(), pageable, 0);
    }

    private Post buildPost(Long idUser,PostRequest postRequest){
        return Post.builder()
                .idUser(idUser)
                .content(postRequest.content())
                .postDate(LocalDateTime.now())
                .imgUrls(postRequest.imgUrls())
                .interactionCount(0L)
                .community(postRequest.community())
                .isDeleted(false)
                .build();
    }

    private List<PostDTO> buildPostDTOsFromPosts(Page<Post> postsPage,List<UserInfoResponse> userInfoResponses){
        List<PostDTO> postDTOS = new ArrayList<>();

        Map<Long, UserInfoResponse> userInfoMap = userInfoResponses.stream()
                .collect(Collectors.toMap(UserInfoResponse::id , userInfo -> userInfo));

        for (Post post : postsPage.getContent()) {
            UserInfoResponse userInfoResponse = userInfoMap.get(post.getIdUser());
            if (userInfoResponse != null) {
                postDTOS.add(PostDTO.fromPost(post, userInfoResponse));
            } else {
                postDTOS.add(PostDTO.fromPost(post, null));
            }
        }

        return postDTOS;
    }

    private Long getUserIdFromUserLogged(){
        Long idUser = userContext.getUserId();

        if(idUser == null){
            throw new ApiException("User not found",HttpStatus.BAD_REQUEST);
        }

        return idUser;
    }

    private Page<Post> filterDeletedPosts(Page<Post> postsPage) {
        List<Post> filteredPosts = postsPage.getContent().stream()
                .filter(post -> !post.getIsDeleted())
                .collect(Collectors.toList());
        return new PageImpl<>(filteredPosts, postsPage.getPageable(), postsPage.getTotalElements());
    }

}
