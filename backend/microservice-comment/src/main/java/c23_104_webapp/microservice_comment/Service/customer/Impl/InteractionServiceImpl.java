package c23_104_webapp.microservice_comment.Service.customer.Impl;

import c23_104_webapp.microservice_comment.DTO.response.customer.UserInfoResponse;
import c23_104_webapp.microservice_comment.Entities.Comment;
import c23_104_webapp.microservice_comment.Entities.ENUM.InteractionType;
import c23_104_webapp.microservice_comment.Entities.Interaction;
import c23_104_webapp.microservice_comment.Exception.ApiException;
import c23_104_webapp.microservice_comment.Repositories.APIClient.UserAPIClient;
import c23_104_webapp.microservice_comment.Repositories.CommentRepository;
import c23_104_webapp.microservice_comment.Repositories.InteractionRepository;
import c23_104_webapp.microservice_comment.Security.UserContext;
import c23_104_webapp.microservice_comment.Service.customer.InteractionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
@Slf4j
public class InteractionServiceImpl implements InteractionService {

    private final InteractionRepository interactionRepository;
    private final CommentRepository commentRepository;
    private final UserContext userContext;
    private final UserAPIClient userAPIClient;


    @Override
    @Transactional
    public void createInteraction(Long idComment) {
        Long idUser = this.getUserIdFromUserLogged();

        Comment comment = commentRepository.findById(idComment).orElseThrow(()-> new ApiException("Comment not found",HttpStatus.BAD_REQUEST));

        boolean alreadyInteracted = interactionRepository.existsByCommentAndIdUser(comment,idUser);

        if(alreadyInteracted){
            interactionRepository.deleteByCommentAndIdUser(comment,idUser);
            comment.setInteractionCount(comment.getInteractionCount()-1);
            log.info("User {} removed interaction from comment {}", idUser, idComment);
        } else {
            Interaction interaction = this.interactionBuild(comment,idUser);
            interactionRepository.save(interaction);
            comment.setInteractionCount(comment.getInteractionCount()+1);
            log.info("User {} added interaction to comment {}", idUser, idComment);
        }
        
        commentRepository.save(comment);
    }

    @Override
    public Page<UserInfoResponse> getInteractionsByComment(Long id, Pageable pageable) {
        Comment comment = commentRepository.findById(id).orElseThrow(() -> new ApiException("Comment not found",HttpStatus.BAD_REQUEST));

        Set<Long> idUsers = interactionRepository.findUserIdsByComment(comment);

        Page<UserInfoResponse> userInfoResponseList = userAPIClient.getUserInfoByIds(new ArrayList<>(idUsers),pageable);

        return new PageImpl<>(userInfoResponseList.getContent(), pageable, userInfoResponseList.getTotalElements());
    }

    private Interaction interactionBuild(Comment comment,Long idUser){
        return Interaction.builder()
                .interactionType(InteractionType.LIKE)
                .comment(comment)
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
