package com.nocontry.comments_ms.service.impl;

import com.nocontry.comments_ms.dto.CommentDto;
import com.nocontry.comments_ms.dto.CommentWithCommentsDto;
import com.nocontry.comments_ms.entity.Comment;
import com.nocontry.comments_ms.mapper.CommentMapper;
import com.nocontry.comments_ms.repository.CommentsRepository;
import com.nocontry.comments_ms.service.ICommentsService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class CommentsService implements ICommentsService {
    @Autowired
    private final CommentsRepository commentRepository;

    @Override
    public CommentDto addComment(CommentDto commentDto) {
        Comment comment = CommentMapper.toEntity(commentDto);
        Comment savedComment = commentRepository.save(comment);
        return CommentMapper.toDto(savedComment, CommentDto.class);
    }

    @Override
    public boolean deleteComment(long commentId) {
        if (commentRepository.existsById(commentId)) {
            commentRepository.deleteById(commentId);
            return true;
        }
        return false;
    }

    @Override
    public CommentDto getComment(long commentId) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new NoSuchElementException("Comment not found with ID: " + commentId));
        return CommentMapper.toDto(comment, CommentDto.class);
    }

    public List<Comment> buildCommentHierarchy(List<Comment> comments) {
        Map<Long, Comment> commentMap = comments.stream()
                .collect(Collectors.toMap(Comment::getCommentId, comment -> comment));

        List<Comment> rootComments = new ArrayList<>();

        for (Comment comment : comments) {
            if (comment.getParentCommentId() == null) {
                rootComments.add(comment);
            } else {
                Comment parent = commentMap.get(comment.getParentCommentId());
                if (parent != null) {
                    parent.getReplies().add(comment);
                }
            }
        }

        return rootComments;
    }

    @Override
    public List<CommentWithCommentsDto> getAllCommentsOfThePost(long postId) {
        List<Comment> comments = commentRepository.findByPostId(postId);
        List<Comment> rootComments = buildCommentHierarchy(comments);
        return rootComments.stream()
                .map(comment -> CommentMapper.toDto(comment, CommentWithCommentsDto.class))
                .toList();
    }

    @Override
    public List<CommentWithCommentsDto> getCommentWithReplies(long commentId) {
        return commentRepository.findCommentsHierarchy(commentId).stream()
                .map(comment -> CommentMapper.toDto(comment, CommentWithCommentsDto.class))
                .toList();
    }

}
