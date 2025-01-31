package c23_104_webapp.microservice_comment.DTO.response.customer;

import c23_104_webapp.microservice_comment.Entities.Comment;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CommentResponse {

    private Long id;
    private Long idPost;
    private Long idCommentParent;
    private Long idUser;
    private String name;
    private String username;
    private String urlProfile;
    private String content;
    private LocalDateTime date;
    private List<String> imgUrls;
    private Long interactionCount;
    private Long repliesCount;

    public static CommentResponse fromComment(Comment comment,UserInfoResponse userInfoResponse){
        if(comment == null){
            return null;
        }

        return new CommentResponse(
                comment.getId(),
                comment.getIdPost(),
                comment.getIdCommentParent(),
                userInfoResponse.id(),
                userInfoResponse.name(),
                userInfoResponse.username(),
                userInfoResponse.urlProfile(),
                comment.getContent(),
                comment.getDate(),
                comment.getImgUrls(),
                comment.getInteractionCount(),
                comment.getRepliesCount()
        );
    }
}
