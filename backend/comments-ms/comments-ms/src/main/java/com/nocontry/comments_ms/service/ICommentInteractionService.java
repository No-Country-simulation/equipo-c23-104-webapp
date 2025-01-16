package com.nocontry.comments_ms.service;

import com.nocontry.comments_ms.dto.CommentInteractionDto;

public interface ICommentInteractionService {
    boolean addInteraction(CommentInteractionDto interactionDTO);
    boolean removeInteraction(CommentInteractionDto interactionDTO);
}