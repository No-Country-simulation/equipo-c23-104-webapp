package com.nocontry.comments_ms.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Schema(
        name = "Comment",
        description = "Schema to comments of the post"
)
@AllArgsConstructor
@NoArgsConstructor
public class CommentDto {
    @NotEmpty(message = "commentId can not be null or empty")
    @Schema(
            description = "Primary key of the comment", example = "1999"
    )
    private Long commentId;

    @NotEmpty(message = "userId can not be null or empty")
    @Schema(
            description = "Foreign key of the User microservice", example = "1999"
    )
    private Long userId;

    @NotEmpty(message = "postId can not be null or empty")
    @Schema(
            description = "Foreign key of the Post microservice", example = "1999"
    )
    private Long postId;

    @Schema(
            description = "The identifier of the parent comment. If the comment is a reply to another comment, " +
                    "this field will contain the ID of the parent comment. If it is not a reply, it will be null.",
            example = "1999"
    )
    private Long parentCommentId;

    @Schema(description = "Content of the comment.", example = "This is a great post!")
    @Size(max = 500, message = "Content must not exceed 500 characters.")
    @NotBlank(message = "Content cannot be blank.")
    private String content;

    @Schema(description = "The timestamp when the comment was created.", example = "2023-01-14T12:34:56")
    private LocalDateTime createdAt;
}
