package com.nocontry.comments_ms.service;

import com.nocontry.comments_ms.dto.CommentInteractionDto;

import java.awt.print.Pageable;

public interface ICommentInteractionService {
    CommentInteractionDto addInteraction(CommentInteractionDto interactionDTO);
    void getInteractionsByCommentId(Long commentId, Pageable pageable);
    void getLikesOfTheComment(long commentId);
}