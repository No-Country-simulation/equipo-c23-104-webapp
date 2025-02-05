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
import c23_104_webapp.microservice_comment.Service.event.CommentEventProducer;
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
    private final CommentEventProducer commentEventProducer;

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

            Long idUser = this.getUserIdFromUserLogged();
            Comment comment = this.buildComment(commentRequest, idUser);
            comment.setIdCommentParent(commentRequest.idCommentParent());
            commentRepository.save(comment);

            return;
        }

        Long idUser = this.getUserIdFromUserLogged();
        Comment comment = this.buildComment(commentRequest, idUser);
        commentRepository.save(comment);

        Long postId = commentRequest.idPost();
        commentEventProducer.sendCommentCreatedEvent(postId);
    }

    @Override
    @CircuitBreaker(name = "microservice-user", fallbackMethod = "fallbackGetComments")
    public Page<CommentResponse> getCommentsByPost(Pageable pageable, Long idPost) {
        Page<Comment> comments = commentRepository.findByIdPostAndIsDeletedFalse(idPost,pageable);

        Page<UserInfoResponse> userInfoList = this.getUserInfoByIds(comments,pageable);

        List<CommentResponse> commentResponses = this.buildCommentResponseFromComments(comments,userInfoList);

        return new PageImpl<>(commentResponses, pageable, comments.getTotalElements());
    }

    @Override
    @CircuitBreaker(name = "microservice-user", fallbackMethod = "fallbackGetComments")
    public Page<CommentResponse> findCommentsWithUserInteraction(Pageable pageable, String username) {
        UserInfoResponse userInfoResponse = userAPIClient.getUserInfoByHandleUsername(username);

        Page<Comment> commentsPage = commentRepository.findCommentsWithUserInteraction(userInfoResponse.id(),pageable);

        Page<UserInfoResponse> userInfoResponses = this.getUserInfoByIds(commentsPage,pageable);

        List<CommentResponse> commentResponses = this.buildCommentResponseFromComments(commentsPage,userInfoResponses);

        return new PageImpl<>(commentResponses,pageable,commentsPage.getTotalElements());
    }

    @Override
    @CircuitBreaker(name = "microservice-user", fallbackMethod = "fallbackGetComments")
    public Page<CommentResponse> findCommentByIdAndReplies(Pageable pageable, Long id) {
        Page<Comment> commentPage = commentRepository.findCommentsByParentId(id,pageable);

        Page<UserInfoResponse> userInfoList = this.getUserInfoByIds(commentPage,pageable);

        List<CommentResponse> commentResponses = this.buildCommentResponseFromComments(commentPage,userInfoList);

        return new PageImpl<>(commentResponses, pageable, commentPage.getTotalElements());
    }

    @Override
    @Transactional
    public void deleteComment(Long id) {
        Long idUser = this.getUserIdFromUserLogged();
        Optional<Comment> comment = commentRepository.findByIdAndIdUserAndIsDeletedFalse(id,idUser);

        if(comment.isPresent()){
            Comment existingComment = comment.get();
            existingComment.setIsDeleted(true);
            commentRepository.save(existingComment);

            if (existingComment.getIdCommentParent() == 0) {
                Long postId = existingComment.getIdPost();
                commentEventProducer.sendCommentDeletedEvent(postId);
            }
        } else {
            throw new ApiException("Comment not found or not belonging to the user",HttpStatus.BAD_REQUEST);
        }
    }

    public Page<CommentResponse> fallbackGetComments(Pageable pageable, Throwable t) {
        return new PageImpl<>(new ArrayList<>(), pageable, 0);
    }

    private List<CommentResponse> buildCommentResponseFromComments(Page<Comment> comments,Page<UserInfoResponse> userInfoResponses){
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

    private Page<UserInfoResponse> getUserInfoByIds(Page<Comment> comments, Pageable pageable) {
        Set<Long> userIds = comments.getContent().stream()
                .map(Comment::getIdUser)
                .collect(Collectors.toSet());

        return userAPIClient.getUserInfoByIds(new ArrayList<>(userIds), pageable);
    }

    private Comment buildComment(CommentRequest commentRequest,Long idUser){
        return Comment.builder()
                .idUser(idUser)
                .idPost(commentRequest.idPost())
                .idCommentParent(commentRequest.idCommentParent())
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
