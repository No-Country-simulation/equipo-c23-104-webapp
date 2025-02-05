package c23_104_webapp.microservice_comment.DTO.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public record CommentRequest(@NotBlank(message = "Content cannot be empty") String content,
                             @NotNull(message = "Post id cannot be null") Long idPost,
                             @NotNull(message = "Parent Comment id cannot be null")Long idCommentParent,
                             List<String> imgUrls) {

}
