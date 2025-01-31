package c23_104_webapp.microservice_comment.Service.customer.Impl;

import c23_104_webapp.microservice_comment.DTO.request.CommentRequest;
import c23_104_webapp.microservice_comment.DTO.response.customer.CommentResponse;
import c23_104_webapp.microservice_comment.DTO.response.customer.UserInfoResponse;
import c23_104_webapp.microservice_comment.Entities.Comment;
import c23_104_webapp.microservice_comment.Exception.ApiException;
import c23_104_webapp.microservice_comment.Repositories.APIClient.UserAPIClient;
import c23_104_webapp.microservice_comment.Repositories.CommentRepository;
import c23_104_webapp.microservice_comment.Security.UserContext;
import c23_104_webapp.microservice_comment.Service.customer.CommentService;
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
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;
    private final UserContext userContext;
    private final UserAPIClient userAPIClient;

    @Override
    @Transactional
    public void createComment(CommentRequest commentRequest) {

        if (commentRequest.idCommentParent() != 0) {
            Optional<Comment> parentComment = commentRepository.findById(commentRequest.idCommentParent());
            if (parentComment.isEmpty()) {
                throw new ApiException("Parent comment not found", HttpStatus.BAD_REQUEST);
            }
            Comment parent = parentComment.get();
            parent.setRepliesCount(parent.getRepliesCount() + 1);
            commentRepository.save(parent);
        }

        Long idUser = this.getUserIdFromUserLogged();

        Comment comment = this.buildComment(commentRequest, idUser);
        commentRepository.save(comment);
    }

    @Override
    @CircuitBreaker(name = "microservice-user", fallbackMethod = "fallbackGetComments")
    public Page<CommentResponse> getCommentsByPost(Pageable pageable, Long idPost) {
        Page<Comment> comments = commentRepository.findByIdPostAndIsDeletedFalse(idPost,pageable);

        Set<Long> userIds = comments.getContent().stream()
                .map(Comment::getIdUser)
                .collect(Collectors.toSet());

        List<UserInfoResponse> userInfoList = userAPIClient.getUserInfoByIds(new ArrayList<>(userIds));

        List<CommentResponse> commentResponses = this.buildCommentResponseFromComments(comments,userInfoList);

        return new PageImpl<>(commentResponses, pageable, comments.getTotalElements());
    }

    public Page<CommentResponse> fallbackGetComments(Pageable pageable, Throwable t) {
        return new PageImpl<>(new ArrayList<>(), pageable, 0);
    }

    private List<CommentResponse> buildCommentResponseFromComments(Page<Comment> comments,List<UserInfoResponse> userInfoResponses){
        List<CommentResponse> commentResponses = new ArrayList<>();

        Map<Long, UserInfoResponse> userInfoMap = userInfoResponses.stream()
                .collect(Collectors.toMap(UserInfoResponse::id , userInfo -> userInfo));

        for (Comment comment : comments.getContent()) {
            UserInfoResponse userInfoResponse = userInfoMap.get(comment.getIdUser());
            if (userInfoResponse != null) {
                commentResponses.add(CommentResponse.fromComment(comment, userInfoResponse));
            } else {
                commentResponses.add(CommentResponse.fromComment(comment, null));
            }
        }

        return commentResponses;
    }

    private Comment buildComment(CommentRequest commentRequest,Long idUser){
        return Comment.builder()
                .idUser(idUser)
                .idPost(commentRequest.idPost())
                .idCommentParent(commentRequest.getIdCommentParent())
                .content(commentRequest.content())
                .date(LocalDateTime.now())
                .imgUrls(commentRequest.imgUrls())
                .interactionCount(0L)
                .repliesCount(0L)
                .isDeleted(false)
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
