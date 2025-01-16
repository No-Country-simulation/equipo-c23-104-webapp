package com.nocontry.comments_ms.service;

import com.nocontry.comments_ms.dto.CommentDto;
import com.nocontry.comments_ms.dto.CommentWithCommentsDto;
import com.nocontry.comments_ms.entity.Comment;

import java.util.List;

public interface ICommentsService {
    CommentDto addComment(CommentDto commentDto);
    boolean deleteComment(long commentId);
    CommentDto getComment(long commentId);
    List<CommentWithCommentsDto> getAllCommentsOfThePost(long postId);
    List<CommentWithCommentsDto> getCommentWithReplies(long commentId);
}
