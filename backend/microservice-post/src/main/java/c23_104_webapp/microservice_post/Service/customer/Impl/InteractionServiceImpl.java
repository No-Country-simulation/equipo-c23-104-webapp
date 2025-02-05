package c23_104_webapp.microservice_post.Service.customer.Impl;

import c23_104_webapp.microservice_post.DTO.response.customer.UserInfoResponse;
import c23_104_webapp.microservice_post.Entities.ENUM.InteractionType;
import c23_104_webapp.microservice_post.Entities.Interaction;
import c23_104_webapp.microservice_post.Entities.Post;
import c23_104_webapp.microservice_post.Exception.ApiException;
import c23_104_webapp.microservice_post.Repositories.APIClient.UserAPIClient;
import c23_104_webapp.microservice_post.Repositories.InteractionRepository;
import c23_104_webapp.microservice_post.Repositories.PostRepository;
import c23_104_webapp.microservice_post.Security.UserContext;
import c23_104_webapp.microservice_post.Service.customer.InteractionService;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Set;

@Service
@RequiredArgsConstructor
@Slf4j
public class InteractionServiceImpl implements InteractionService {

    private final InteractionRepository interactionRepository;
    private final UserContext userContext;
    private final PostRepository postRepository;
    private final UserAPIClient userAPIClient;

    @Override
    @Transactional
    public void createInteraction(Long idPost) {
        Long idUser = this.getUserIdFromUserLogged();
        Post post = postRepository.findById(idPost).orElseThrow(() -> new ApiException("Post not found",HttpStatus.BAD_REQUEST));

        boolean alreadyInteracted = interactionRepository.existsByPostAndIdUser(post, idUser);

        if (alreadyInteracted) {
            interactionRepository.deleteByPostAndIdUser(post, idUser);
            post.setInteractionCount(post.getInteractionCount() - 1);
            log.info("User {} removed interaction from post {}", idUser, idPost);
        } else {
            Interaction interaction = this.interactionBuild(post, idUser);
            interactionRepository.save(interaction);
            post.setInteractionCount(post.getInteractionCount() + 1);
            log.info("User {} added interaction to post {}", idUser, idPost);
        }

        postRepository.save(post);
    }

    @Override
    @CircuitBreaker(name = "microservice-user", fallbackMethod = "fallbackGetInteractions")
    public Page<UserInfoResponse> getInteractionsByPost(Long id,Pageable pageable) {
        Post post = postRepository.findById(id).orElseThrow(() -> new ApiException("Post not found",HttpStatus.BAD_REQUEST));

        Set<Long> userIds = interactionRepository.findUserIdsByPost(post);

        Page<UserInfoResponse> userInfoList = userAPIClient.getUserInfoByIds(new ArrayList<>(userIds),pageable);

        return new PageImpl<>(userInfoList.getContent(), pageable, userInfoList.getTotalElements());
    }

    public Page<UserInfoResponse> fallbackGetInteractions(Pageable pageable, Throwable t) {
        return new PageImpl<>(new ArrayList<>(), pageable, 0);
    }

    private Interaction interactionBuild(Post post,Long idUser){
        return Interaction.builder()
                .interactionType(InteractionType.LIKE)
                .post(post)
                .idUser(idUser)
                .build();
    }


    private Long getUserIdFromUserLogged(){
        Long idUser = userContext.getUserId();

        if(idUser == null){
            throw new ApiException("User not found", HttpStatus.BAD_REQUEST);
        }

        return idUser;
    }
}
