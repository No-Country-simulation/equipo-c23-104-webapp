package com.nocontry.comments_ms.mapper;

import com.nocontry.comments_ms.dto.CommentDto;
import com.nocontry.comments_ms.dto.CommentWithCommentsDto;
import com.nocontry.comments_ms.entity.Comment;

import java.util.stream.Collectors;

public class CommentMapper {

    public static <T> T toDto(Comment comment, Class<T> dtoClass) {
        if (dtoClass == CommentDto.class) {
            CommentDto commentDto = new CommentDto();
            commentDto.setCommentId(comment.getCommentId());
            commentDto.setContent(comment.getContent());
            commentDto.setReactions(comment.getReactions());
            commentDto.setUserId(comment.getUserId());
            commentDto.setPostId(comment.getPostId());
            commentDto.setParentCommentId(comment.getParentCommentId());
            commentDto.setCreatedAt(comment.getCreatedAt());
            return dtoClass.cast(commentDto);
        } else if (dtoClass == CommentWithCommentsDto.class) {
            CommentWithCommentsDto commentWithCommentsDto = new CommentWithCommentsDto();
            commentWithCommentsDto.setCommentId(comment.getCommentId());
            commentWithCommentsDto.setContent(comment.getContent());
            commentWithCommentsDto.setReactions(comment.getReactions());
            commentWithCommentsDto.setUserId(comment.getUserId());
            commentWithCommentsDto.setPostId(comment.getPostId());
            commentWithCommentsDto.setParentCommentId(comment.getParentCommentId());
            commentWithCommentsDto.setCreatedAt(comment.getCreatedAt());
            commentWithCommentsDto.setReplies(comment.getReplies().stream()
                    .map(reply -> toDto(reply, CommentWithCommentsDto.class))
                    .collect(Collectors.toList()));
            return dtoClass.cast(commentWithCommentsDto);
        }
        throw new IllegalArgumentException("Unsupported DTO type: " + dtoClass.getName());
    }

    public static Comment toEntity(CommentDto commentDto) {
        Comment comment = new Comment();
        comment.setCommentId(commentDto.getCommentId());
        comment.setContent(commentDto.getContent());
        comment.setReactions(commentDto.getReactions());
        comment.setUserId(commentDto.getUserId());
        comment.setPostId(commentDto.getPostId());
        comment.setParentCommentId(commentDto.getParentCommentId());
        return comment;
    }
}
