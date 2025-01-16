package com.nocontry.comments_ms.controller;

import com.nocontry.comments_ms.dto.BaseResponseDto;
import com.nocontry.comments_ms.dto.CommentDto;
import com.nocontry.comments_ms.dto.CommentInteractionDto;
import com.nocontry.comments_ms.service.ICommentInteractionService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path="/api/comments-interaction")
@AllArgsConstructor
public class CommentInteractionController {
    private final ICommentInteractionService commentInteractionService;

    @PostMapping
    public ResponseEntity<BaseResponseDto<Boolean>> addInteraction(@Valid @RequestBody CommentInteractionDto interactionDto) {
        boolean success = commentInteractionService.addInteraction(interactionDto);
        BaseResponseDto<Boolean> response = new BaseResponseDto<>(
                "success",
                "Interaction created successfully",
                List.of(success)
        );
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @DeleteMapping
    public ResponseEntity<BaseResponseDto<Boolean>> deleteInteraction(@Valid @RequestBody CommentInteractionDto interactionDto) {
        boolean success = commentInteractionService.removeInteraction(interactionDto);
        BaseResponseDto<Boolean> response = new BaseResponseDto<>(
                "success",
                "Interaction Deleted successfully",
                List.of(success)
        );
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

}
