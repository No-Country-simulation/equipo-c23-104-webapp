package com.nocontry.comments_ms.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Schema(description = "Data transfer object representing an interaction with a comment (e.g., like, dislike).")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CommentInteractionDto {
    @Schema(description = "Unique identifier for the interaction.", example = "1")
    private Long interactionId;

    @Schema(description = "Unique identifier for the comment that was interacted with.", example = "1001")
    @NotNull(message = "Comment ID is required.")
    private Long commentId;

    @Schema(description = "Unique identifier for the user who interacted with the comment.", example = "2001")
    @NotNull(message = "User ID is required.")
    private Long userId;

    @Schema(description = "The timestamp when the interaction occurred.", example = "2023-01-14T12:34:56")
    private LocalDateTime createdAt;

}
