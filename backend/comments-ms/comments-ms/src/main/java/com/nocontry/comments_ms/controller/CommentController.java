package com.nocontry.comments_ms.controller;

import com.nocontry.comments_ms.dto.BaseResponseDto;
import com.nocontry.comments_ms.dto.CommentDto;
import com.nocontry.comments_ms.dto.CommentWithCommentsDto;
import com.nocontry.comments_ms.service.ICommentsService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path="/api/comments", produces = {MediaType.APPLICATION_JSON_VALUE})
@Validated
public class CommentController {
    private final ICommentsService icommentsService;

    public CommentController(ICommentsService icommentsService) {
        this.icommentsService = icommentsService;
    }

    @PostMapping
    public ResponseEntity<BaseResponseDto<CommentDto>> createComment(@Valid @RequestBody CommentDto commentDto) {
        CommentDto savedComment =  icommentsService.addComment(commentDto);
        BaseResponseDto<CommentDto> response = new BaseResponseDto<CommentDto>(
                "success",
                "Comment created successfully",
                List.of(savedComment)
        );
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<BaseResponseDto<Void>> deleteComment(@PathVariable Long id) {
        boolean isDeleted = icommentsService.deleteComment(id);
        if (isDeleted) {
            BaseResponseDto<Void> response = new BaseResponseDto<>(
                    "success",
                    "Comment deleted successfully",
                    null
            );
            return ResponseEntity.ok(response);
        } else {
            BaseResponseDto<Void> response = new BaseResponseDto<>(
                    "failure",
                    "Comment not found or could not be deleted",
                    null
            );
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
    }

    @GetMapping("/{commentId}")
    public ResponseEntity<BaseResponseDto<CommentDto>> getComment(@PathVariable long commentId) {
        CommentDto commentDto = icommentsService.getComment(commentId);

        BaseResponseDto<CommentDto> response = new BaseResponseDto<>(
                "success",
                "Comment retrieved successfully",
                List.of(commentDto)
        );

        return ResponseEntity.ok(response);
    }

    @GetMapping("/{commentId}/replies")
    public ResponseEntity<BaseResponseDto<CommentWithCommentsDto>> getCommentReplies(@PathVariable long commentId) {
        List<CommentWithCommentsDto> comments = icommentsService.getCommentWithReplies(commentId);
        BaseResponseDto<CommentWithCommentsDto> response = new BaseResponseDto<>(
                "success",
                "Comment retrieved successfully",
                comments
        );
        return ResponseEntity.ok(response);
    }

    @GetMapping("/post/{postId}")
    public ResponseEntity<BaseResponseDto<CommentWithCommentsDto>> getAllCommentsOfThePost(@PathVariable long postId) {
        List<CommentWithCommentsDto> comments = icommentsService.getAllCommentsOfThePost(postId);
        BaseResponseDto<CommentWithCommentsDto> response = new BaseResponseDto<>(
                "success",
                "Comments retrieved successfully",
                comments
        );
        return ResponseEntity.ok(response);
    }



}
